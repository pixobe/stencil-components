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
  editable: boolean = false;

  @Prop()
  picker: boolean = false;

  @Event()
  colorSelected: EventEmitter;

  @AttachInternals()
  internals!: ElementInternals;

  colorRef: HTMLCanvasElement;

  @State()
  isOpen: boolean = true;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onColorSelect = (value: string) => {
    this.value = value;
    this.internals.setFormValue(value);
    this.colorSelected.emit(value);
  }

  renderColors() {
    if (Array.isArray(this.colors)) {
      return (
        this.colors.map(color => {
          return (
            <button
              style={{ backgroundColor: color }}
              onClick={() => this.onColorSelect(color)}
              class={{ 'rounded': true, "active": this.value === color }} title={color}></button>
          );
        })
      );
    }
  }

  renderEditableColor() {
    const add = (e: any) => {
      const color = e.target.value;
      this.colors = [...this.colors, color];
      this.isOpen = false;
    }

    if (this.isOpen) {
      if (this.editable) {
        return (
          <div>
            <label title={"Add new color"} class="rounded" htmlFor='color' onInput={(e) => add(e)}>
              <icon-add></icon-add>
              <input type="color" id="color" title="Add new color" ref={(el) => this.colorRef = el as any} />
            </label>
          </div >
        );
      }
    }
  }

  render() {
    return (
      <Host>
        <div class="form-element color-picker">
          <label htmlFor={this.name} class="text-lbl">{this.label}</label>
          <div class="color-items">
            {this.renderColors()}
            {this.renderEditableColor()}
          </div>
        </div>
        <div id="picker-container">
          <canvas id="color-canvas" width="300" height="200" ref={(el) => this.colorRef = el as any}></canvas>
        </div>
      </Host>
    );
  }
}
