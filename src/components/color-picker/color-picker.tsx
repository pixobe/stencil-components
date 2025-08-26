import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { Color } from './color-utils';


interface CssVarsContext {
  el: HTMLElement;
  currentColor: Color;
}

function CssVars(
  _u: any,
  _v: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (this: CssVarsContext, ...args: any[]) {
    const result = originalMethod.apply(this, args);
    const color = this.currentColor;
    const el = this.el;
    if (color && el) {
      const rgb = color.rgb;
      const beta = Number((1 - color.a).toFixed(2));
      el.style.setProperty('--alpha-slider-thumb-background', `rgba(250,250,250, ${beta})`);
      el.style.setProperty('--alpha-slider-track-background', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
    return result;
  };
  return descriptor;
}


@Component({
  tag: 'color-picker',
  styleUrls: ['color-picker.scss'],
  shadow: true,
})
export class ColorPicker {

  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  color: string;

  @Prop()
  swatches: string;

  @Prop()
  editable: boolean = false;

  @Event({ eventName: "colorChange", bubbles: true, composed: true })
  colorChangeEvent: EventEmitter<string>;

  @Event({ eventName: "colorInput", bubbles: true, composed: true })
  colorInputEvent: EventEmitter<string>;

  @Event({ eventName: "swatchUpdate", bubbles: true, composed: true })
  swatchUpdateEvent: EventEmitter<string>;

  @State()
  currentColor: Color;

  @State()
  swatchList: string[] = []

  @State()
  alpha: number = 1;

  currentPoint: { x: number, y: number } = { x: 0, y: 0 };
  coloringAreaRef: HTMLDivElement;
  markerRef: HTMLDivElement;
  isPointerDown: boolean = false;
  markerPosition: { x: number, y: number } = { x: 0, y: 0 }

  get matrixColor(): string {
    return `hsla(${this.currentColor.hsl.h}, 100%, 50%)`;
  }

  @CssVars
  componentWillLoad() {
    this.swatchList = this.swatches ? this.swatches.split(",") : [];
    this.alpha = this.alpha ? this.alpha : 1;
    const color =
      (this.color && this.color.trim() !== "" ? this.color : null) ??
      (this.swatchList[0] && this.swatchList[0].trim() !== "" ? this.swatchList[0] : null) ??
      "#cacaca";
    this.currentColor = new Color({ hex: color, a: this.alpha });
  }

  componentDidLoad() {
    this.updateMarkerPositionFromColor();
  }

  @CssVars
  onHueChange(e: any) {
    const hue = parseInt(e.target?.value, 10);
    const currentHsl = this.currentColor.hsl;
    this.currentColor = new Color({ hsl: { h: hue, s: currentHsl.s, l: currentHsl.l }, a: this.alpha });
  };

  @CssVars
  onAlphaChange(e: any) {
    const alpha = parseInt(e.target?.value, 10) / 100;
    this.alpha = alpha;
    this.currentColor.a = alpha;
  };

  @CssVars
  onColorPickerMove(e: PointerEvent) {
    e.stopPropagation()
    if (!this.isPointerDown) return;
    const rect = this.coloringAreaRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    // Move the marker
    const marker = this.markerRef;
    if (marker) {
      marker.style.left = `${x}px`;
      marker.style.top = `${y}px`;
    }
    const h = this.currentColor.hsl.h;
    const s = (x / rect.width) * 100;
    const l = 100 - (y / rect.height) * 100;
    // Convert to RGBA
    this.currentColor = new Color({ hsl: { h, s, l }, a: this.alpha });
    this.colorInputEvent.emit(this.currentColor.hexa);
  };

  onPointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    this.isPointerDown = true;
    this.coloringAreaRef.setPointerCapture(e.pointerId);
    this.onColorPickerMove(e);
  }

  onPointerUp = (e: PointerEvent) => {
    e.stopPropagation();
    this.isPointerDown = false;
    if (e.pointerId) {
      try {
        this.coloringAreaRef.releasePointerCapture(e.pointerId);
      } catch (e) {
        console.error(e);
      }
    }
    this.colorChangeEvent.emit(this.currentColor.hexa);
  }

  updateMarkerPositionFromColor() {
    const { s, l } = this.currentColor.hsl;
    if (!this.coloringAreaRef || !this.markerRef) return;
    const rect = this.coloringAreaRef.getBoundingClientRect();
    const x = (s / 100) * rect.width;
    const y = ((100 - l) / 100) * rect.height;
    this.markerRef.style.left = `${x}px`;
    this.markerRef.style.top = `${y}px`;
  }

  addSwatch = (color: string) => {
    this.swatchList.push(color);
    this.swatchList = [...this.swatchList];
    this.swatchUpdateEvent.emit(this.swatchList.join(","));
  }

  onSwatchSelected = (e: PointerEvent, color: string) => {
    e.stopPropagation();
    if (this.editable) {
      const index = this.swatchList.findIndex(swatch => swatch === color);
      this.swatchList.splice(index, 1);
      this.swatchList = [...this.swatchList];
      this.swatchUpdateEvent.emit(this.swatchList.join(","));
    } else {
      this.currentColor = new Color({ hex: color, a: this.alpha });
      this.updateMarkerPositionFromColor();
      this.colorChangeEvent.emit(this.currentColor.hexa);
    }
  }

  handleHexKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const color = (event.target as HTMLInputElement).value;
      this.currentColor = new Color({ hex: color, a: this.alpha });
      this.updateMarkerPositionFromColor();
      this.colorChangeEvent.emit(this.currentColor.hexa);
    }
  }

  render() {
    return (
      <Host>
        <div class="clr-picker" onPointerUp={this.onPointerUp}>
          <div id="clr-color-area" class="clr-matrix" role="application" style={{ color: this.matrixColor }}
            onPointerMove={(e) => this.onColorPickerMove(e)}
            onPointerDown={this.onPointerDown}
            ref={(el) => this.coloringAreaRef = el!}>
            <div id="clr-color-marker" class="clr-marker" tabindex="0" ref={(el) => this.markerRef = el!}></div>
          </div>
          <div class="clr-controls">
            <div class="clr-hue">
              <input id="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="Hue slider" class="custom-slider"
                value={this.currentColor?.hsl.h ?? 0}
                onInput={(e) => this.onHueChange(e)} />
              <div id="clr-hue-marker"></div>
            </div>
            <div class="clr-alpha">
              <input id="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="Opacity slider" class="custom-slider"
                value={this.alpha * 100}
                onInput={(e) => this.onAlphaChange(e)} />
              <span></span>
            </div>
            <div class="clr-info">
              <button id="clr-color-preview" class="clr-preview" type="button" aria-label="Current color" style={{ backgroundColor: this.currentColor.rgba }}></button>
              <input
                id="clr-color-value"
                class="clr-code"
                type="text"
                aria-label="Color value field"
                value={this.currentColor.hex}
                name="hex"
                onKeyDown={this.handleHexKeyDown.bind(this)} />
            </div>

            <div class="clr-swatches">
              {
                this.swatchList?.map(swatch => (
                  <button
                    style={{ backgroundColor: swatch }}
                    class='clr-swatch'
                    onPointerUp={(e) => this.onSwatchSelected(e, swatch)}>
                  </button>))
              }
              {
                this.editable &&
                <button class='clr-add' onPointerUp={() => this.addSwatch(this.currentColor.hex)}><icon-add></icon-add></button>
              }
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
