import { AttachInternals, Component, Element, h, Host, Prop, State } from '@stencil/core';

export interface OptionItem {
  label: string;
  value: string;
}

@Component({
  tag: 'select-menu',
  styleUrl: 'select-menu.scss',
  shadow: true,
  formAssociated: true
})
export class SelectMenu {

  @Element()
  el: HTMLElement

  @Prop({ reflect: true }) name: string;

  @Prop()
  options: OptionItem[] = []

  @Prop({ mutable: true })
  value: string = ''

  @Prop()
  fontSelector: boolean = false;

  @AttachInternals()
  internals: ElementInternals;

  @State()
  open = false;

  toggleDropdown = () => {
    this.open = !this.open;
  };

  onOptionSelect = (opt: OptionItem) => {
    this.value = opt.value;
    this.internals.setFormValue(opt.value);
    this.open = false;
    const event = new CustomEvent('input', {
      detail: { value: opt.value },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
  }

  get selectedLabel() {
    return this.options.find(opt => opt.value === this.value)?.label
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label class="menu-lbl">{this.name}</label>
          <div class={{ 'custom-dropdown': true, 'open': this.open }}>
            <div class="custom-dropdown-trigger" onClick={this.toggleDropdown}>
              {this.value ? <div>{this.selectedLabel}</div> : <div>Select {this.name}</div>}
            </div>
            <div class="custom-dropdown-menu">
              {this.options.map(opt => (
                <div onClick={() => this.onOptionSelect(opt)} style={this.fontSelector && { fontFamily: opt.label }}
                  class={{ "custom-dropdown-item": true, "active": this.value === opt.value }}
                >{opt.label}</div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
