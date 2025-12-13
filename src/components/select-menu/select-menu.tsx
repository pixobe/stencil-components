import { AttachInternals, Component, Element, h, Host, Prop, State } from '@stencil/core';

export interface OptionItem {
  label: string;
  value: string;
}

@Component({
  tag: 'p-select',
  styleUrl: 'select-menu.scss',
  shadow: true,
  formAssociated: true
})
export class SelectMenuElement {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true })
  label?: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop()
  required: boolean = true;

  @AttachInternals()
  internals!: ElementInternals;

  @Prop()
  options: OptionItem[] = []

  @State()
  open = false;

  get selectedLabel() {
    return this.options.find(opt => opt.value === this.value)?.label
  }

  get displayName() {
    return this.label || this.name;
  }

  toggleDropdown = () => {
    this.open = !this.open;
  };

  componentDidLoad() {
    this.internals.setFormValue(this.value);
  }

  onOptionSelect = (opt: OptionItem) => {
    this.value = opt.value;
    this.internals.setFormValue(opt.value);
    const event = new CustomEvent('input', {
      detail: opt.value,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
    this.open = false;
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label class="menu-lbl">{this.displayName}</label>
          <div class={{ 'custom-dropdown': true, 'open': this.open }}>
            <div class="custom-dropdown-trigger" onClick={this.toggleDropdown}>
              {this.value ? <div>{this.selectedLabel}</div> : <div class="placeholder">Select {this.displayName}</div>}
            </div>
            <div class="custom-dropdown-menu">
              {this.options.map(opt => (
                <div onClick={() => this.onOptionSelect(opt)}
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
