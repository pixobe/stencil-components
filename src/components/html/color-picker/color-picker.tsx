import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true,
})
export class ColorPicker {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = ''

  @Prop()
  colors!: string | string[];

  @Prop()
  addMore: boolean = false;

  @Prop()
  withPicker: boolean = false; // last one picker

  @AttachInternals()
  internals!: ElementInternals;

  onInputFn = (value: string) => {
    this.value = value;
    this.internals.setFormValue(this.value);
    const event = new CustomEvent('input', {
      detail: { value },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
  }

  renderColors() {
    if (Array.isArray(this.colors)) {
      return (
        this.colors.map(color => {
          return (
            <button style={{ "background-color": color }}
              onClick={() => this.onInputFn(color)}
              class={{ 'rounded': true, "active": this.value === color }} title={color}></button>
          );
        })
      );
    }
    return <input type="color" name={this.name} onInput={(e: any) => this.onInputFn(e.target.value)} id={this.name} value={this.value}
      style={{ 'border-color': this.value }} />
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
