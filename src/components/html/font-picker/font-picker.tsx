import { AttachInternals, Component, Element, h, Host, Prop, State } from '@stencil/core';


export interface FontItem {
  name: string;
  url: string;
}

@Component({
  tag: 'font-picker',
  styleUrl: 'font-picker.scss',
  shadow: true,
  formAssociated: true
})
export class FontPicker {

  @Element()
  el: HTMLElement

  @Prop({ reflect: true })
  name: string = "Fonts";

  @Prop()
  options: FontItem[] = []

  @Prop({ mutable: true })
  value: string = ''

  @AttachInternals()
  internals: ElementInternals;

  @State()
  open = false;

  toggleDropdown = () => {
    this.open = !this.open;
  };

  onOptionSelect = (opt: FontItem) => {
    this.value = opt.name;
    this.internals.setFormValue(opt.name);
    this.open = false;
    const event = new CustomEvent('input', {
      detail: { value: opt.name },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label class="menu-lbl">{this.name}</label>
          <div class={{ 'custom-dropdown': true, 'open': this.open }}>
            <div class="custom-dropdown-trigger" onClick={this.toggleDropdown}>
              {this.value ? <div>{this.value}</div> : <div>Select {this.name}</div>}
            </div>
            <div class="custom-dropdown-menu">
              {this.options.map(opt => (
                <div onClick={() => this.onOptionSelect(opt)} style={{ 'font-family': opt.name }}
                  class={{ "custom-dropdown-item": true, "active": this.value === opt.name }}
                >{opt.name}</div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
