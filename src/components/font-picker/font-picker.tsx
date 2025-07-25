import { FontItem, fontLoader } from '@pixobe/ui-utils';
import { AttachInternals, Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'font-picker',
  styleUrl: 'font-picker.scss',
  shadow: true,
  formAssociated: true
})
export class FontPicker {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name: string = "Fonts";

  @Prop({ reflect: true })
  label?: string;

  @Prop()
  fonts: FontItem[] = []

  @Prop({ mutable: true })
  value: string = ''

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  open = false;

  toggleDropdown = () => {
    this.open = !this.open;
  };

  onOptionSelect = (opt: FontItem) => {
    this.value = opt.name;
    this.internals.setFormValue(opt.name);
    const event = new CustomEvent('input', {
      detail: { value: opt.name },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
    this.open = false;
  }

  componentWillLoad() {
    this.internals.setFormValue(this.value);
    Promise.all(this.fonts.map(async (font) => await fontLoader(font)));
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label class="menu-lbl">{this.label || this.name}</label>
          <div class={{ 'custom-dropdown': true, 'open': this.open }}>
            <div class="custom-dropdown-trigger" onClick={this.toggleDropdown}>
              {this.value ? <div>{this.value}</div> : <div>Select one {this.label}</div>}
            </div>
            <div class="custom-dropdown-menu">
              {this.fonts.map(opt => {
                const fontFamily = { fontFamily: opt.name };
                return (
                  <div onClick={() => this.onOptionSelect(opt)} style={fontFamily}
                    class={{ "custom-dropdown-item": true, "active": this.value === opt.name }}
                  >{opt.name}</div>
                )
              })}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
