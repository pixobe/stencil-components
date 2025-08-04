import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';


@Component({
  tag: 'color-list',
  styleUrls: ['color-list.scss'],
  shadow: true,
  formAssociated: true
})
export class ColorList {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @Prop({ mutable: true })
  colors!: string[];

  @Prop()
  editMode: boolean = false;

  @Prop()
  picker: boolean = false;

  @Event({ eventName: "colorSelect" })
  onColorSelectEvent: EventEmitter<string>

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  dropdownPosition: { top?: string; bottom?: string; left?: string; right?: string } = {
    top: '100%',
    left: '0',
  };

  colorRef: HTMLCanvasElement;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onColorSelect = (value: string) => {
    this.value = value;
    this.internals.setFormValue(value);
  }

  onColorPicked = (value: string) => {
    this.onColorSelect(value);
    this.onColorSelectEvent.emit(value);
  }

  onColorPickerSelected = (value: string) => {
    this.onColorSelect(value);
  }

  add = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const color = e.detail;
    this.colors = [...this.colors, color];
  }

  show = () => {
    this.onColorSelect('');
  }


  remove(e: any, color: string) {
    e.stopPropagation();
    e.preventDefault();
    const index = this.colors.findIndex(c => c === color);
    this.colors.splice(index, 1);
    this.colors = [...this.colors];
  }

  renderColorPicker() {
    if (this.picker) {
      return (
        <button title={"Add new color"} class="rounded gradient">
          <color-picker
            class="color-picker-element"
            onColorSelect={(e) => this.onColorPickerSelected(e.detail)}
          ></color-picker>
        </button>
      )
    }
  }

  renderColors() {
    if (Array.isArray(this.colors)) {
      return (
        this.colors.map((color) => {
          return (
            <button
              style={{ backgroundColor: color }}
              onClick={() => this.onColorPicked(color)}
              class={{ 'rounded': true, "deletable": true, "active": this.value === color }}
              title={color}>
              {this.editMode
                && <button class="button-trash" onClick={(e) => this.remove(e, color)}>
                  <icon-trash></icon-trash>
                </button>}
            </button>
          );
        })
      );
    }
  }

  renderAddColor() {
    if (this.editMode) {
      return (
        <button title={"Add new color"} class="rounded">
          <icon-add></icon-add>
          <color-picker
            class="color-picker-element"
            onColorSelect={(e: any) => this.add(e)}
          ></color-picker>
        </button>
      );
    }
  }

  render() {
    return (
      <Host>
        <div class="form-element color-picker">
          <label htmlFor={this.name} class="text-lbl">{this.label}</label>
          <div class="color-items">
            {this.renderColors()}
            {this.renderColorPicker()}
            {this.renderAddColor()}
          </div>
        </div>
        <div id="picker-container">
          <canvas id="color-canvas" width="300" height="200" ref={(el) => this.colorRef = el as any}></canvas>
        </div>
      </Host>
    );
  }
}
