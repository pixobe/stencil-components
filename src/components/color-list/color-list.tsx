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

  @Event({ eventName: "select" })
  onColorSelectEvent: EventEmitter<string>

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  isOpen: boolean = false;

  @State()
  dropdownPosition: { top?: string; bottom?: string; left?: string; right?: string } = {
    top: '100%',
    left: '0',
  };

  @State()
  selectedIndex = 0;

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
    this.onColorSelectEvent.emit(value)
  }

  onColorPickerSelected = (value: string) => {
    this.onColorSelect(value);
    this.isOpen = false;
  }

  add = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const color = e.detail;
    this.colors = [...this.colors, color];
    this.isOpen = false;
  }

  show = () => {
    this.isOpen = true;
  }

  cancel = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.isOpen = false;
    console.log('cancelled')
  }

  renderColorPicker() {
    if (this.picker) {
      return (
        <div class="lbl-add">
          <button title={"Add new color"} class="rounded gradient" onClick={() => this.show()}> </button>
          {
            this.isOpen &&
            <div class="color-picker-wrapper">
              <color-picker
                class="color-picker-element"
                onSelect={(e) => this.onColorPickerSelected(e.detail)}
                onCancel={this.cancel}></color-picker>
            </div>
          }
        </div>
      )
    }
  }

  renderColors() {
    if (Array.isArray(this.colors)) {
      return (
        this.colors.map(color => {
          return (
            <button
              style={{ backgroundColor: color }}
              onClick={() => this.onColorPicked(color)}
              class={{ 'rounded': true, "active": this.value === color }}
              title={color}></button>
          );
        })
      );
    }
  }

  renderAddColor() {
    if (this.editMode) {
      return (
        <div class="lbl-add">
          <button title={"Add new color"} class="rounded" onClick={() => this.show()}>
            <icon-add></icon-add>
          </button>
          {
            this.isOpen &&
            <div style={this.dropdownPosition} class="color-picker-wrapper">
              <color-picker
                class="color-picker-element"
                onSelect={(e) => this.add(e)}
                onCancel={(e) => this.cancel(e)}></color-picker>
            </div>
          }
        </div>
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
