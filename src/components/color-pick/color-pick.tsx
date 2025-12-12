import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { Color, CssVars } from '../../utils/color-utils';

@Component({
  tag: 'p-colorpicker',
  styleUrls: ['color-pick.scss'],
  shadow: true,
  formAssociated: true,
})
export class PixobeColorPickerElement {

  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  name!: string;

  @Prop()
  label?: string;

  @Prop({ mutable: true })
  value: string;

  @Prop()
  alpha: boolean = false;


  @Event({ eventName: "colorChange", bubbles: true, composed: true })
  colorChangeEvent: EventEmitter<string>;

  @Event({ eventName: "colorInput", bubbles: true, composed: true })
  colorInputEvent: EventEmitter<string>;

  @State()
  currentColor: Color;

  @State()
  opacity: number = 1;

  @AttachInternals()
  internals!: ElementInternals;

  coloringAreaRef: HTMLDivElement;
  markerRef: HTMLDivElement;
  isPointerDown: boolean = false;

  private propagateColor(options: { emitInput?: boolean; emitChange?: boolean } = {}) {
    if (!this.currentColor) {
      return;
    }
    const hexa = this.currentColor.hexa;
    this.internals?.setFormValue(hexa);
    if (options.emitInput) {
      this.colorInputEvent.emit(hexa);
    }
    if (options.emitChange) {
      this.colorChangeEvent.emit(hexa);
    }
  }

  get matrixColor(): string {
    return `hsla(${this.currentColor.hsl.h}, 100%, 50%)`;
  }

  @CssVars
  componentWillLoad() {
    this.opacity = this.opacity || 1;
    const color = this.value?.trim() || "#cacaca";
    console.log(this.value)
    this.currentColor = new Color({ hex: color, a: this.opacity });
  }

  componentDidLoad() {
    this.updateMarkerPositionFromColor();
    this.propagateColor();
  }

  onHueChange(e: Event) {
    const hue = parseInt((e.target as HTMLInputElement).value, 10);
    const { s, l } = this.currentColor.hsl;
    this.currentColor = new Color({ hsl: { h: hue, s, l }, a: this.opacity });
    this.propagateColor({ emitInput: true });
  }

  @CssVars
  onAlphaChange(e: Event) {
    this.opacity = parseInt((e.target as HTMLInputElement).value, 10) / 100;
    this.currentColor.a = this.opacity;
    this.propagateColor({ emitInput: true });
  }

  @CssVars
  onColorPickerMove(e: PointerEvent) {
    e.stopPropagation();
    if (!this.isPointerDown) return;

    const rect = this.coloringAreaRef.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    this.markerRef.style.left = `${x}px`;
    this.markerRef.style.top = `${y}px`;

    const h = this.currentColor.hsl.h;
    const s = (x / rect.width) * 100;
    const l = 100 - (y / rect.height) * 100;

    this.currentColor = new Color({ hsl: { h, s, l }, a: this.opacity });
    this.propagateColor({ emitInput: true });
  }

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
      } catch (error) {
        console.error(error);
      }
    }
    this.propagateColor({ emitChange: true });
  }

  updateMarkerPositionFromColor() {
    if (!this.coloringAreaRef || !this.markerRef) return;

    const { s, l } = this.currentColor.hsl;
    const rect = this.coloringAreaRef.getBoundingClientRect();
    const x = (s / 100) * rect.width;
    const y = ((100 - l) / 100) * rect.height;

    this.markerRef.style.left = `${x}px`;
    this.markerRef.style.top = `${y}px`;
  }

  @CssVars
  handleHexKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const color = (event.target as HTMLInputElement).value?.trim();
    if (!color) {
      return;
    }

    this.currentColor = new Color({ hex: color, a: this.opacity });
    this.updateMarkerPositionFromColor();
    this.propagateColor({ emitInput: true, emitChange: true });
  }

  render() {
    return (
      <Host>
        <div class="clr-picker" >
          <div
            id="clr-color-area"
            class="clr-matrix"
            role="application"
            style={{ color: this.matrixColor }}
            onPointerUp={this.onPointerUp}
            onPointerMove={this.onColorPickerMove.bind(this)}
            onPointerDown={this.onPointerDown}
            ref={(el) => this.coloringAreaRef = el!}
          >
            <div
              id="clr-color-marker"
              class="clr-marker"
              tabindex="0"
              ref={(el) => this.markerRef = el!}
            ></div>
          </div>
          <div class="clr-controls">
            <div class="clr-hue">
              <input
                id="clr-hue-slider"
                type="range"
                min="0"
                max="360"
                step="1"
                aria-label="Hue slider"
                class="custom-slider"
                value={this.currentColor?.hsl.h ?? 0}
                onInput={this.onHueChange.bind(this)}
                onPointerUp={(e) => e.stopImmediatePropagation()}
              />
              <div id="clr-hue-marker"></div>
            </div>
            {this.alpha && <div class="clr-alpha">
              <input
                id="clr-alpha-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                aria-label="Opacity slider"
                class="custom-slider"
                value={this.opacity * 100}
                onInput={this.onAlphaChange.bind(this)}
              />
              <span></span>
            </div>}

            <div class="clr-info">
              <button
                id="clr-color-preview"
                class="clr-preview"
                type="button"
                aria-label="Current color"
                style={{ backgroundColor: this.currentColor.rgba }}
              ></button>
              <input
                id="clr-color-value"
                class="clr-code"
                type="text"
                aria-label="Color value field"
                value={this.currentColor.hex}
                name="hex"
                onKeyDown={(e) => this.handleHexKeyDown(e)}
                onPointerUp={(e) => e.stopImmediatePropagation()}
                autocomplete="off"
              />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
