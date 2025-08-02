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

  @Event({ eventName: "color" })
  onColorInputEventEmitter: EventEmitter<string>;

  @Event({ eventName: 'cancel' })
  cancelEventEmitter: EventEmitter<void>;

  @Event({ eventName: 'select' })
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
    this.handleColorMapInteraction(e);
  };

  private handleColorMapMouseMove = (e: MouseEvent) => {
    if (this._dragging) {
      this.handleColorMapInteraction(e);
    }
  };

  private handleHueSliderMouseDown = (e: MouseEvent) => {
    this._draggingSlider = true;
    this.handleSliderInteraction(e);
  };

  private handleHueSliderMouseMove = (e: MouseEvent) => {
    if (this._draggingSlider) {
      this.handleSliderInteraction(e);
    }
  };

  private handleAlphaSliderMouseDown = (e: MouseEvent) => {
    this._draggingAlpha = true;
    this.handleAlphaInteraction(e);
  };

  private handleAlphaSliderMouseMove = (e: MouseEvent) => {
    if (this._draggingAlpha) {
      this.handleAlphaInteraction(e);
    }
  };

  private handleHexInputChange = (e: Event) => {
    const hexValue = (e.target as HTMLInputElement).value;
    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      const rgb = this._hexToRgb(hexValue);
      if (rgb) {
        const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
        this._hue = hsl.h;
        this._saturation = hsl.s;
        this._lightness = hsl.l;
        // Alpha is maintained when changing hex
        this._updateUI();
      }
    }
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
    const rgb = this._hslToRgb(this._hue, this._saturation, this._lightness);
    this._rgbaCache = { ...rgb, a: this._alpha };
    this._hexCache = this._hslToHex(this._hue, this._saturation, this._lightness);
    this.onColorInputEventEmitter.emit(this._hexCache);
    this._updateUI();
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

  // Color conversion utilities
  private _hslToRgb(h: number, s: number, l: number): RGB {
    h /= 360;
    s /= 100;
    l /= 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = this._hueToRgb(p, q, h + 1 / 3);
      g = this._hueToRgb(p, q, h);
      b = this._hueToRgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  private _hueToRgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  private _rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0;
    let s: number = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  private _hslToHex(h: number, s: number, l: number): string {
    const rgb = this._hslToRgb(h, s, l);
    return `#${this._componentToHex(rgb.r)}${this._componentToHex(
      rgb.g
    )}${this._componentToHex(rgb.b)}`;
  }

  private _componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  private _hexToRgb(hex: string): RGB | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
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
      rgb: this._hslToRgb(this._hue, this._saturation, this._lightness),
      rgba: {
        ...this._hslToRgb(this._hue, this._saturation, this._lightness),
        a: this._alpha,
      },
      hex: this._hslToHex(this._hue, this._saturation, this._lightness),
      cssColor: this._selectedColor,
    };
  }

  public setColor(color: ColorInput): void {
    // Handle hex color format

    if (typeof color === "string" && color.startsWith("#")) {
      const rgb = this._hexToRgb(color);
      if (rgb) {
        const hsl = this._rgbToHsl(rgb.r, rgb.g, rgb.b);
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
        const hsl = this._rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
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

  onColorSelected() {
    this.colorSelectedEventEmitter.emit(this._hexCache);
  }

  onCancelEvent() {
    this.cancelEventEmitter.emit();
  }



  render() {
    return (
      <Host>
        <div class="color-picker-container">
          <div
            class="color-map-container"
            onMouseDown={this.handleColorMapMouseDown}
            onMouseMove={this.handleColorMapMouseMove}
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
            onMouseDown={this.handleHueSliderMouseDown}
            onMouseMove={this.handleHueSliderMouseMove}
          >
            <canvas class="hue-slider" width="256" height="30"></canvas>
            <div
              class="slider-indicator hue-slider-indicator"
              style={{ left: `${this._sliderIndicator.x}px` }}
            ></div>
          </div>

          <div
            class="alpha-slider-container"
            onMouseDown={this.handleAlphaSliderMouseDown}
            onMouseMove={this.handleAlphaSliderMouseMove}
          >
            <canvas class="alpha-slider" width="256" height="30"></canvas>
            <div
              class="slider-indicator alpha-slider-indicator"
              style={{ left: `${this._alphaIndicator.x}px` }}
            ></div>
          </div>

          <div class="color-info">
            <div class="color-values">
              <div class="color-value">
                <label>HEX:</label>
                <input
                  title="HEX"
                  type="text"
                  class="hex-value"
                  value={this._hexCache}
                  onChange={this.handleHexInputChange}
                />
              </div>
              <div class="color-value">
                <label>RGBA:</label>
                <input
                  title="RGBA"
                  type="text"
                  class="rgba-value"
                  value={`${this._rgbaCache.r},${this._rgbaCache.g},${this._rgbaCache.b},${this._rgbaCache.a.toFixed(2)}`}
                  readonly
                />
              </div>
              <div class="color-value">
                <label>Alpha:</label>
                <input
                  title="Alpha"
                  type="text"
                  class="alpha-value"
                  value={`${Math.round(this._alpha * 100)}%`}
                  readonly
                />
              </div>
            </div>
          </div>
          <div class="button-group">
            <button class="button-secondary" onClick={() => this.onCancelEvent()}>Cancel</button>
            <button class="button-primary" onClick={() => this.onColorSelected()}>Ok</button>
          </div>
        </div>
      </Host>
    );
  }
}
