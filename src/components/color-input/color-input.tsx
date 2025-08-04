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

  colorRef: HTMLColorPickerElement;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  componentDidLoad() {
    const colorPicker = document.createElement("color-picker");
    colorPicker.value = this.value as any;
    colorPicker.style.display = 'none';
    colorPicker.classList.add("centered");
    document.body.appendChild(colorPicker);
    this.colorRef = colorPicker;

    colorPicker.addEventListener("colorSelect", (e) => {
      this.onColorSelect(e)
      this.hideColorPicker();

    });

    colorPicker.addEventListener("closePicker", () => {
      this.hideColorPicker()
    });
    colorPicker.addEventListener("colorInput", (e) => {
      this.onColorSelect(e)
    });

  }

  onColorSelect = (e: any) => {
    const value = e.detail;
    this.value = value;
    this.internals.setFormValue(value);
  }

  showColorPicker() {
    this.colorRef.style.display = 'block';
  }

  hideColorPicker() {
    this.colorRef.style.display = 'none';
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <div class='color-wrapper'>
            <button title={'Color Picker'} style={{ 'color': this.value }} class="button-picker" onClick={() => this.showColorPicker()}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="currentColor" rx="4" ></rect>
              </svg>
              <label>{this.label}</label>
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
