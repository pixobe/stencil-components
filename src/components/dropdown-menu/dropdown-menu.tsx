import { Component, Host, h, Event, EventEmitter, Prop, Element } from '@stencil/core';
import { DropdownOption } from './dropdown-utils';

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
  options?: DropdownOption[];

  @Prop({ mutable: true })
  value: any;

  @Event() valueChanged: EventEmitter<string>;

  checkbox: HTMLInputElement;

  onSelect(val: any) {
    this.checkbox.checked = false;
    this.value = val;
    this.valueChanged.emit(val);
  }

  onSlotchangeEvent = (e) => {
    const slot = e.target;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    const menuList = assignedNodes[0];
    const items = menuList.querySelectorAll(".menu-list-item");
    items.forEach((item: HTMLElement) => {
      item.addEventListener("click", (e: any) => {
        const dataset = e.target.dataset;
        this.onSelect(dataset.value);
      });
    })
  }

  scrollTo = (e) => {
    if (e.target.checked) {
      const container = this.el.shadowRoot.querySelector(".menu-list") as HTMLDivElement;
      const targetItem = this.el.shadowRoot.querySelector(`#item_${this.value}`) as HTMLDivElement;
      if (targetItem && container) {
        container.scrollTop = targetItem.offsetTop - container.offsetTop;
      }
    }
  }

  render() {
    return (
      <Host>
        <div class="dropdown">
          <label class="menu" htmlFor="checkedbox">
            <div class="display"> <slot name="menu-label" >{this.value}</slot></div>
            <div class="icon"><slot name="icon" /></div>
          </label>
          <input type="checkbox" id="checkedbox" ref={el => (this.checkbox = el)} onInput={this.scrollTo} />
          <div class="menu-list">
            <slot name="menu-list-items" onSlotchange={this.onSlotchangeEvent}>
              {this.options?.map(option => {
                return (
                  <div class={{ "menu-list-item": true, selected: option.value === this.value }}
                    id={`item_${option.value}`}
                    onClick={() => this.onSelect(option.value)}
                    key={`item_${option.value}`}>
                    {option.label}
                  </div>
                );
              })}
            </slot>
          </div>
        </div>
      </Host>
    );
  }
}
