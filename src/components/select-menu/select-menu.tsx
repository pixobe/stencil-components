import { Component, h, Prop, State } from '@stencil/core';

export interface OptionItem {
  label: string;
  value: string;
}


@Component({
  tag: 'select-menu',
  styleUrl: 'select-menu.scss',
  shadow: true,
})
export class SelectMenu {
  @Prop()
  label: string = 'Menus';

  @Prop()
  options: OptionItem[] = []

  @State()
  open = false;

  toggle = () => {
    this.open = !this.open;
  };

  render() {
    return (
      <div class={{ 'dropdown': true, 'open': this.open }}>
        <button class="dropdown-toggle" onClick={this.toggle}>
          {this.label}
          <span class="chevron">▾</span>
        </button>
        <ul class="dropdown-menu">
          {this.options.map((opt) => <li>{opt.label}</li>)}
        </ul>
      </div>
    );
  }
}
