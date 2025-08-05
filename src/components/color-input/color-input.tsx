import { AttachInternals, Component, Host, h, Prop, Element } from '@stencil/core';
import { computePosition } from '@floating-ui/dom';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true
})
export class ColorInput {

  @Element()
  el: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @AttachInternals()
  internals!: ElementInternals;

  ref: HTMLElement;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  componentDidLoad() {
    computePosition(this.el, this.ref).then(({ x, y }) => {
      console.log(x, y);
    });
  }

  onColorSelect = (e: any) => {
    const value = e.detail;
    this.value = value;
    this.internals.setFormValue(value);
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <div class='color-wrapper'>
            <button title={'Color Picker'}
              style={{ 'color': this.value }}
              class="button-picker">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="currentColor" rx="4" ></rect>
              </svg>
              <label>{this.label}</label>
            </button>
            <div class="color-picker-wrapper" ref={(el) => this.ref = el!}>
              <color-picker ></color-picker>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
