import { Component, Host, h, Event, EventEmitter, Prop, Element } from '@stencil/core';

@Component({
  tag: 'dropdown-menu',
  styleUrl: 'dropdown-menu.scss',
  shadow: true,
})
export class DropdownMenu {
  @Element()
  el: HTMLElement;

  @Prop()
  tooltip?: string;

  @Prop()
  options: Array<string | number>;

  @Prop({ mutable: true })
  value: string | number;

  checkbox: HTMLInputElement;

  @Event() valueChanged: EventEmitter<string>;

  onSelect(opt: string) {
    this.checkbox.checked = false;
    this.value = opt;
    this.valueChanged.emit(opt);
  }

  render() {
    return (
      <Host>
        <div class="dropdown">
          <label class="dropdown__face" htmlFor="dropdown" role="button" title={this.tooltip}>
            <div class="dropdown__text">{this.value}</div>
            <div class="dropdown__arrow">
              <slot></slot>
            </div>
          </label>
          <input type="checkbox" id="dropdown" ref={el => (this.checkbox = el)} />
          {this.options && this.options.length && (
            <ul class="dropdown__items">
              {this.options.map(opt => (
                <li onClick={() => this.onSelect(opt.toString())} class={{ selected: this.value == opt }}>
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Host>
    );
  }
}
