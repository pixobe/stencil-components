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
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }
  close() {
    this.isOpen = false;
  }

  render() {
    return (
      <Host>
        <div class='color-wrapper'>
          <div>
            <button title={'Color Picker'} onClick={() => this.open()} style={{ 'color': this.value }} class="button-picker">
              <icon-circle></icon-circle>
              <label>{this.label}</label>
            </button>
          </div>
          {this.isOpen &&
            <color-picker
              onSelect={(e) => this.onColorOk(e)}
              onColor={(e) => this.onColorSelect(e)}
              onCancel={() => this.close()} value={this.value as any}></color-picker>}
        </div>
      </Host>
    );
  }
}
