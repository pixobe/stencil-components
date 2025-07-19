import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.scss',
  shadow: true,
  formAssociated: true
})
export class ColorPicker {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @Prop()
  addMore: boolean = false;

  @Prop()
  withPicker: boolean = false;

  type = "color";

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onInputFn = (e: any) => {
    const inputEvent = e as InputEvent;
    const value = (inputEvent.target as HTMLInputElement).value;
    this.value = value;
    this.internals.setFormValue(value);
  }

  render() {
    return (
      <Host>
        <div class="form-element color-picker">
          <label htmlFor={this.name} class="text-lbl">{this.label}</label>
          <div class="color-items">
            <input type="color" name={this.name} onInput={(e: any) => this.onInputFn(e)} id={this.name} value={this.value}
              style={{ 'border-color': this.value }} />
          </div>
        </div>
      </Host>
    );
  }
}
