import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
  h
} from "@stencil/core";
import {
  ColorInfo,
  ColorInput,
  ColorPosition,
  HSL,
  HSLA,
  RGB,
  RGBA,
} from "./color-picker.types";
import { hexToRgb, hslToHex, hslToRgb, rgbToHsl } from "./color-utils";

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true,
  formAssociated: true
})
export class ColorPickerComponent {
  @Element()
  el: HTMLElement;

  @Prop({ mutable: true })
  value: ColorInput;

  @Event({ eventName: "colorInput", composed: false })
  onColorInputEventEmitter: EventEmitter<string>;

  @Event({ eventName: 'closePicker', composed: false })
  cancelEventEmitter: EventEmitter<void>;

  @Event({ eventName: 'colorSelect', composed: false })
  colorSelectedEventEmitter: EventEmitter<string>;

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  private _hue: number = 0;
  @State()
  private _saturation: number = 100;
  @State()
  private _lightness: number = 50;
  @State()
  private _alpha: number = 1;
  @State()
  private _selectedColor: string = "hsla(0, 100%, 50%, 1)";

  @Watch("color")
  onColorChanges(newValue: ColorInput) {
    this.setColor(newValue);
  }

  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _sliderCanvas: HTMLCanvasElement;
  private _sliderCtx: CanvasRenderingContext2D;
  private _alphaCanvas: HTMLCanvasElement;
  private _alphaCtx: CanvasRenderingContext2D;

  private _dragging: boolean = false;
  private _draggingSlider: boolean = false;
  private _draggingAlpha: boolean = false;
  private _colorMapIndicator: ColorPosition = { x: 0, y: 0 };
  private _sliderIndicator: ColorPosition = { x: 0 };
  private _alphaIndicator: ColorPosition = { x: 0 };

  private _rgbaCache: RGBA = { r: 0, g: 0, b: 0, a: 1 };
  private _hexCache: string = '#000000';
  private _drawPending = false;

  connectedCallback() {
    window.addEventListener("mouseup", this.handleGlobalMouseUp);
  }

  disconnectedCallback() {
    window.removeEventListener("mouseup", this.handleGlobalMouseUp);
  }

  componentWillLoad() {
    if (this.value) {
      this.setColor(this.value);
    }
  }

  componentDidLoad() {
    // Get canvas references
    this._canvas = this.el.shadowRoot!.querySelector(".color-map")!;
    this._ctx = this._canvas.getContext("2d")!;
    this._sliderCanvas =
      this.el.shadowRoot!.querySelector(".hue-slider")!;
    this._sliderCtx = this._sliderCanvas.getContext("2d")!;
    this._alphaCanvas =
      this.el.shadowRoot!.querySelector(".alpha-slider")!;
    this._alphaCtx = this._alphaCanvas.getContext("2d")!;
    // Initialize the UI
    this._drawColorMap();
    this._drawHueSlider();
    this._drawAlphaSlider();
    this._updateColorMapIndicator();
    this._updateSliderIndicator();
    this._updateAlphaIndicator();


  }
  private handleGlobalMouseUp = () => {
    this._dragging = false;
    this._draggingSlider = false;
    this._draggingAlpha = false;
  };

  private handleColorMapMouseDown = (e: MouseEvent) => {
    this._dragging = true;
    this._draggingAlpha = false;
    this._draggingSlider = false;
    this.handleColorMapInteraction(e);
  };

  private handleColorMapMouseMove = (e: MouseEvent) => {
    if (this._dragging) {
      this.handleColorMapInteraction(e);
    }
  };

  private handleSliderMouseMove = (e: MouseEvent) => {
    if (this._draggingAlpha) {
      this.handleAlphaInteraction(e);
    } else if (this._draggingSlider) {
      this.handleSliderInteraction(e);
    }
  };

  private handleHueSliderMouseDown = (e: MouseEvent) => {
    this._dragging = false;
    this._draggingAlpha = false;
    this._draggingSlider = true;
    this.handleSliderInteraction(e);
  };


  private handleAlphaSliderMouseDown = (e: MouseEvent) => {
    this._dragging = false;
    this._draggingSlider = false;
    this._draggingAlpha = true;
    this.handleAlphaInteraction(e);
  };

  private handleHexInputChange = (e: Event) => {
    const hexValue = (e.target as HTMLInputElement).value;
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      const rgb = hexToRgb(hexValue);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        this._hue = hsl.h;
        this._saturation = hsl.s;
        this._lightness = hsl.l;
        // Alpha is maintained when changing hex
        this._updateUI();

        this._rgbaCache = { ...rgb, a: 1 };
      }
    }
    this._hexCache = hexValue;
  };

  private handleColorMapInteraction(e: MouseEvent) {
    const rect = this._canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(255, e.clientX - rect.left));
    const y = Math.max(0, Math.min(255, e.clientY - rect.top));

    // Convert position to saturation and lightness
    this._saturation = (x / 255) * 100;
    this._lightness = 100 - (y / 255) * 100;

    this._colorMapIndicator = { x, y };
    this._queueUpdate(true);
  }

  private handleSliderInteraction(e: MouseEvent) {
    const rect = this._sliderCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(255, e.clientX - rect.left));
    const hue = (x / 255) * 360;

    if (this._hue !== hue) {
      this._hue = hue;
      this._sliderIndicator.x = x;
      this._queueUpdate();
    }
  }

  private handleAlphaInteraction(e: MouseEvent) {
    const rect = this._alphaCanvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(255, e.clientX - rect.left));

    // Convert position to alpha (0-1)
    this._alpha = x / 255;

    this._alphaIndicator = { x };
    this._queueUpdate(false);
  }

  private _drawColorMap() {
    if (!this._ctx) return;
    const width = this._canvas.width;
    const height = this._canvas.height;

    // Draw base hue color
    this._ctx.fillStyle = `hsl(${this._hue}, 100%, 50%)`;
    this._ctx.fillRect(0, 0, width, height);

    // Overlay white -> transparent (saturation)
    const whiteGrad = this._ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, 'white');
    whiteGrad.addColorStop(1, 'transparent');
    this._ctx.fillStyle = whiteGrad;
    this._ctx.fillRect(0, 0, width, height);

    // Overlay transparent -> black (lightness)
    const blackGrad = this._ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, 'transparent');
    blackGrad.addColorStop(1, 'black');
    this._ctx.fillStyle = blackGrad;
    this._ctx.fillRect(0, 0, width, height);
  }

  private _drawHueSlider() {
    if (!this._sliderCtx) return;

    const width = this._sliderCanvas.width;
    const height = this._sliderCanvas.height;

    // Create gradient
    const gradient = this._sliderCtx.createLinearGradient(0, 0, width, 0);

    // Add color stops for a smooth rainbow gradient
    for (let i = 0; i <= 360; i += 30) {
      const position = i / 360;
      gradient.addColorStop(position, `hsl(${i}, 100%, 50%)`);
    }

    // Clear canvas
    this._sliderCtx.clearRect(0, 0, width, height);

    // Fill with gradient
    this._sliderCtx.fillStyle = gradient;
    this._sliderCtx.fillRect(0, 0, width, height);

    // Add a subtle 3D effect
    this._sliderCtx.fillStyle = "rgba(255, 255, 255, 0.2)";
    this._sliderCtx.fillRect(0, 0, width, height / 2);

    // Add a subtle border
    this._sliderCtx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    this._sliderCtx.lineWidth = 1;
    this._sliderCtx.strokeRect(0, 0, width, height);
  }

  private _drawAlphaSlider() {
    if (!this._alphaCtx) return;

    const width = this._alphaCanvas.width;
    const height = this._alphaCanvas.height;

    // Create gradient from transparent to opaque with the current color
    const gradient = this._alphaCtx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(
      0,
      `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, 0)`
    );
    gradient.addColorStop(
      1,
      `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, 1)`
    );

    // Clear canvas
    this._alphaCtx.clearRect(0, 0, width, height);

    // Fill with gradient
    this._alphaCtx.fillStyle = gradient;
    this._alphaCtx.fillRect(0, 0, width, height);

    // Add a subtle border
    this._alphaCtx.strokeStyle = "rgba(0, 0, 0, 0.1)";
    this._alphaCtx.lineWidth = 1;
    this._alphaCtx.strokeRect(0, 0, width, height);
  }

  private _updateSelectedColor() {
    this._selectedColor = `hsla(${this._hue}, ${this._saturation}%, ${this._lightness}%, ${this._alpha})`;
    const rgb = hslToRgb(this._hue, this._saturation, this._lightness);
    this._rgbaCache = { ...rgb, a: this._alpha };
    this._hexCache = hslToHex(this._hue, this._saturation, this._lightness);
    this._updateUI();
    requestAnimationFrame(() => {
      this.onColorInputEventEmitter.emit(this._hexCache);
    })
  }

  private _updateUI() {
    // Update color map indicator position
    this._updateColorMapIndicator();

    // Update slider indicator position
    this._updateSliderIndicator();

    // Update alpha indicator position
    this._updateAlphaIndicator();
  }

  private _updateColorMapIndicator() {
    const x = (this._saturation / 100) * 255;
    const y = (1 - this._lightness / 100) * 255;
    this._colorMapIndicator = { x, y };
  }

  private _updateSliderIndicator() {
    const x = (this._hue / 360) * 255;
    this._sliderIndicator = { x };
  }

  private _updateAlphaIndicator() {
    const x = this._alpha * 255;
    this._alphaIndicator = { x };
  }


  // Public API
  public getColor(): ColorInfo {
    return {
      hsl: { h: this._hue, s: this._saturation, l: this._lightness },
      hsla: {
        h: this._hue,
        s: this._saturation,
        l: this._lightness,
        a: this._alpha,
      },
      rgb: hslToRgb(this._hue, this._saturation, this._lightness),
      rgba: {
        ...hslToRgb(this._hue, this._saturation, this._lightness),
        a: this._alpha,
      },
      hex: hslToHex(this._hue, this._saturation, this._lightness),
      cssColor: this._selectedColor,
    };
  }

  public setColor(color: ColorInput): void {
    if (typeof color === "string" && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        this._hue = hsl.h;
        this._saturation = hsl.s;
        this._lightness = hsl.l;
        this._rgbaCache = { ...rgb, a: 1 };
      }
      this._hexCache = color as string;
    }
    else if (typeof color === "object") {
      // RGBA format
      if ("r" in color && "g" in color && "b" in color) {
        const rgbColor = color as RGB | RGBA;
        const hsl = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
        this._hue = hsl.h;
        this._saturation = hsl.s;
        this._lightness = hsl.l;
        if ("a" in color) this._alpha = (color as RGBA).a;
      }
      // HSLA format
      else if ("h" in color && "s" in color && "l" in color) {
        const hslColor = color as HSL | HSLA;
        this._hue = hslColor.h;
        this._saturation = hslColor.s;
        this._lightness = hslColor.l;
        if ("a" in color) this._alpha = (color as HSLA).a;
      }
    }
    const x = (this._saturation / 100) * 255;
    const y = (1 - this._lightness / 100) * 255;
    this._colorMapIndicator = { x, y };
    this.internals.setFormValue(color as string);
  }


  private _queueUpdate = (drawAlphaSlider = true, drawColorMap = true,) => {
    if (this._drawPending) return;
    this._drawPending = true;
    requestAnimationFrame(() => {
      if (drawColorMap) {
        this._drawColorMap();
      }
      if (drawAlphaSlider) {
        this._drawAlphaSlider();
      }
      this._updateSelectedColor();
      this._drawPending = false;
    });
  };

  onColorSelected(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.colorSelectedEventEmitter.emit(this._hexCache);
  }

  onCancelEvent(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.cancelEventEmitter.emit();
  }

  render() {
    return (
      <Host>
        <div class="color-picker-container" onPointerMove={this.handleSliderMouseMove}>
          <div
            class="color-map-container"
            onPointerDown={this.handleColorMapMouseDown}
            onPointerMove={this.handleColorMapMouseMove}
          >
            <canvas class="color-map" width="256" height="256"></canvas>
            <div
              class="color-map-indicator"
              style={{
                left: `${this._colorMapIndicator.x}px`,
                top: `${this._colorMapIndicator.y}px`,
              }}
            ></div>
          </div>

          <div
            class="slider-container hue-slider-container"
            onPointerDown={this.handleHueSliderMouseDown}
            onPointerMove={this.handleSliderMouseMove}
          >
            <canvas class="hue-slider" width="256" height="16"></canvas>
            <div
              class="slider-indicator hue-slider-indicator"
              style={{ left: `${this._sliderIndicator.x}px` }}
            ></div>
          </div>

          <div
            class="alpha-slider-container"
            onPointerDown={this.handleAlphaSliderMouseDown}
            onPointerMove={this.handleSliderMouseMove}
          >
            <canvas class="alpha-slider" width="256" height="16"></canvas>
            <div
              class="slider-indicator alpha-slider-indicator"
              style={{ left: `${this._alphaIndicator.x}px` }}
            ></div>
          </div>

          <div class="color-info">
            <div class="color-values">
              <div class="color-value">
                <label>R:</label>
                <input
                  title="Red"
                  type="text"
                  class="hex-value"
                  value={this._rgbaCache.r}
                />
              </div>
              <div class="color-value">
                <label>G:</label>
                <input
                  title="Green"
                  type="text"
                  class="hex-value"
                  value={this._rgbaCache.g}
                />
              </div>
              <div class="color-value">
                <label>B:</label>
                <input
                  title="Blue"
                  type="text"
                  class="hex-value"
                  value={this._rgbaCache.b}
                />
              </div>

              <div class="color-value">
                <label>A:</label>
                <input
                  title="Alpha"
                  type="text"
                  class="hex-value"
                  value={this._rgbaCache.a.toFixed(2)}
                  onChange={this.handleHexInputChange}
                />
              </div>
              <div class="color-indicator" style={{ backgroundColor: this._hexCache }}>
              </div>
              <div class="color-value">
                <input
                  title="HEX"
                  type="text"
                  class="hex-value"
                  value={this._hexCache.toLocaleUpperCase()}
                  onChange={this.handleHexInputChange}
                />
              </div>
            </div>
          </div>
          <div class="button-group">
            <button class="button-secondary" onClick={(e) => this.onCancelEvent(e)}>Cancel</button>
            <button class="button-primary" onClick={(e) => this.onColorSelected(e)}>Ok</button>
          </div>
        </div>
      </Host>
    );
  }
}
