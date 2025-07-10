import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'color-list',
  styleUrl: 'color-list.scss',
  shadow: true,
  formAssociated: true
})
export class ColorList {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = ''

  @Prop()
  colors!: string[];

  @Prop()
  addMore: boolean = false;

  @Prop()
  withPicker: boolean = false; // last one picker

  @Event()
  colorSelected: EventEmitter;

  @AttachInternals()
  internals!: ElementInternals;

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
            <button style={{ "background-color": color }}
              onClick={() => this.onColorSelect(color)}
              class={{ 'rounded': true, "active": this.value === color }} title={color}></button>
          );
        })
      );
    }
  }

  render() {
    return (
      <Host>
        <div class="form-element color-picker">
          <label htmlFor={this.name} class="text-lbl">{this.name}</label>
          <div class="color-items">
            {this.renderColors()}
          </div>
        </div>
      </Host>
    );
  }
}
