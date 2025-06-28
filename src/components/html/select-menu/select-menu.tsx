import { AttachInternals, Component, h, Host, Prop, State } from '@stencil/core';

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
  @Prop()
  label: string = 'Menus';

  @Prop()
  options: OptionItem[] = []

  @State()
  value: string = ''

  @AttachInternals()
  internals: ElementInternals;

  @State()
  open = false

  toggleDropdown = () => {
    this.open = !this.open;
  };

  onSelectMenu = (value: string) => {
    this.value = value;
    this.internals.setFormValue(value);
    this.open = false;
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label class="menu-lbl">{this.label}</label>
          <div class={{ 'custom-dropdown': true, 'open': this.open }}>
            <div class="custom-dropdown-trigger" onClick={this.toggleDropdown}>
              {this.value ? <div>{this.value}</div> : <div>Select {this.label}</div>}
            </div>
            <div class="custom-dropdown-menu">
              {this.options.map(opt => (
                <div class="custom-dropdown-item" style={{ "font-family": opt.label }} onClick={() => this.onSelectMenu(opt.value)}>{opt.label}</div>
              ))}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
