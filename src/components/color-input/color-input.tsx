import { AttachInternals, Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true
})
export class ColorInput {

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  isOpen = false;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onColorSelect = (e: any) => {
    const value = e.detail;
    this.value = value;
    this.internals.setFormValue(value);
  }

  onColorOk = (e: any) => {
    this.onColorSelect(e);
  }


  render() {
    return (
      <Host>
        <div class="form-element">
          <div class='color-wrapper'>
            <button title={'Color Picker'} style={{ 'color': this.value }} class="button-picker">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="currentColor" rx="4" ></rect>
              </svg>
              <label>{this.label}</label>
              <color-picker
                onColorSelect={(e) => this.onColorOk(e)}
                onColorInput={(e) => this.onColorSelect(e)}
                value={this.value as any}></color-picker>
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
