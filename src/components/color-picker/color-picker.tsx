import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { strToRGBA, RGBAtoHSVA, RGBAToHex, HSVAtoRGBA } from './color-utils';
import { background } from 'storybook/internal/theming';

@Component({
  tag: 'color-picker',
  styleUrls: ['color-picker.scss'],
  shadow: true,
})
export class ColorPicker {

  @Element()
  el: HTMLElement;

  @Prop()
  color: string = '#ff0000';

  @Prop({ mutable: true })
  swatches: string[] = [];

  @Prop()
  editMode: boolean = false;

  @Event({ eventName: "changed" })
  colorChangeEvent: EventEmitter<string>;

  @Event({ eventName: "selected" })
  colorSelectEvent: EventEmitter<string>;

  @Event({ eventName: "added" })
  colorAddEvent: EventEmitter<string>;

  @State()
  hue: number = 0;

  @State()
  pickerColor: string;

  @State()
  alpha: number = 1;

  coloringAreaRef: HTMLDivElement;
  markerRef: HTMLDivElement;
  isPointerDown: boolean = false;
  markerPosition: { x: number, y: number } = { x: 0, y: 0 }


  onColorAdddedEvent = () => { }

  onSwatchSelected = (color: string) => {
    console.log(color)
  }

  onHueChanged = (e: any) => {
    this.hue = parseInt(e.target?.value, 10);
    this.pickerColor = `hsl(${this.hue}, 100%, 50%)`;
  };

  getPointerPosition = (event: PointerEvent) => {
    return {
      pageX: event.pageX,
      pageY: event.pageY,
    };
  };

  onPointerDown = () => {
    this.isPointerDown = true;
  }

  onPointerUp = () => {
    this.isPointerDown = false;
  }

  handleColorPickerMove = (e: PointerEvent) => {
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
    const s = (this.markerPosition.x / rect.width) * 100;
    const v = 100 - (this.markerPosition.y / rect.height) * 100;
  };



  getMarkerColor = () => {
    // Get the current HSV values
    const { h, s, v } = this.getCurrentHSV();

    // Convert to RGBA
    const rgba = HSVAtoRGBA({ h, s, v, a: this.alpha });

    // Convert to HEX
    this.hexColor = RGBAToHex(rgba);

    // Store the opaque version (without alpha)
    this.opaqueHexColor = this.hexColor.substring(0, 7);

    // Create the color string
    const colorString = `hsla(${h}, ${s}%, ${v}%, ${this.alpha})`;
    this.currentColor = colorString;

    // Update color marker color
    if (this.colorMarker) {
      this.colorMarker.style.color = this.opaqueHexColor;
    }

    // Update alpha slider elements
    this.updateAlphaUI();

    // Update the color preview and hex input
    this.updateColorPreview();

    // Force repaint the gradients to fix Chrome bug
    this.forceGradientRepaint();

    // Emit color change event (like coloris.js onChange)
    this.colorChange.emit(this.hexColor);
  };



  render() {
    return (
      <Host>
        <div class="clr-picker"
          onPointerMove={this.handleColorPickerMove}
          onPointerUp={this.onPointerUp}>
          <div id="clr-color-area" class="clr-matrix" role="application" style={{ color: this.pickerColor }}
            ref={(el) => this.coloringAreaRef = el!}>
            <div id="clr-color-marker" class="clr-marker" tabindex="0" onPointerDown={this.onPointerDown} ref={(el) => this.markerRef = el!}></div>
          </div>
          <div class="clr-controls">
            <div class="clr-hue">
              <input id="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="Hue slider" class="custom-slider"
                onInput={(e) => this.onHueChanged(e)} />
              <div id="clr-hue-marker"></div>
            </div>
            <div class="clr-alpha">
              <input id="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="Opacity slider" class="custom-slider" />
              <span></span>
            </div>
            <div class="clr-info">
              <button id="clr-color-preview" class="clr-preview" type="button" aria-label="Current color"></button>
              <input id="clr-color-value" class="clr-code" type="text" aria-label="Color value field" />
            </div>

            <div class="clr-swatches">
              {
                this.swatches.map(swatch => (
                  <button style={{ backgroundColor: swatch }} class='clr-swatch' onClick={() => this.onSwatchSelected(swatch)}>
                    {this.editMode && <icon-trash class='icon-trash'></icon-trash>}
                  </button>))
              }
              {
                this.editMode && <button class='add-swatch' onClick={this.onColorAdddedEvent}><icon-add></icon-add></button>
              }
            </div>
          </div>
        </div>
      </Host>
    );
  }
}



