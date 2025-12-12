import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * 
 */
export interface DropdownOption {
  value: string | number;
  label: any;
}

@Component({
  tag: 'p-menuicon',
  styleUrl: 'menu-icon.scss',
  shadow: true,
})
export class DropdownMenu {
  @Element()
  el: HTMLElement;

  @Prop()
  options?: DropdownOption[];

  @Prop({ mutable: true })
  value: any;

  @Event() valueChanged: EventEmitter<string>;

  checkbox: HTMLInputElement;
  menu: HTMLDivElement;

  items: NodeList;
  currentSelectedItem: HTMLElement;

  onSelect = (e: Event) => {
    const target = e.currentTarget as HTMLElement;
    const value = target.dataset.value;
    this.valueChanged.emit(value);
    this.checkbox.checked = false;
    this.value = value;
    this.activateItem(target);
  }

  onSlotChange = (e: any) => {
    const slot = e.target as HTMLSlotElement;
    this.onSelectListeners(slot.assignedElements()[0] as HTMLElement)
  }

  componentDidLoad() {
    this.onSelectListeners(this.el.shadowRoot!);
  }

  onSelectListeners = (container: HTMLElement | ShadowRoot) => {
    const menuItems = container.querySelectorAll(".menu-item") as NodeListOf<HTMLDivElement>;
    if (menuItems.length > 0) {
      menuItems.forEach(item => {
        const dataset = item.dataset;
        if (dataset.value === this.value) {
          item.classList.add("active");
          this.currentSelectedItem = item;
        }
        item.addEventListener("click", this.onSelect);
      });
      this.items = menuItems;
    }
  }

  activateItem(target: HTMLElement): void {
    if (this.currentSelectedItem) {
      this.currentSelectedItem.classList.remove("active");
    }
    target.classList.add("active");
    this.currentSelectedItem = target;
  }

  getMenuItems() {
    if (this.options) {
      return this.options?.map(option => {
        const id = `item_${option.value}`
        return (
          <div class="menu-item" id={id} key={id} data-value={option.value}>
            {option.label}
          </div>
        );
      });
    }
    return <slot name="menu-items" onSlotchange={this.onSlotChange}></slot>;
  }

  render() {
    return (
      <Host>
        <div class="dropdown">
          <label class="menu-label" htmlFor="checkedbox">
            <div class="text"><slot name="menu-text">{this.value}</slot></div>
            <div class="icon"><slot name="menu-icon" /></div>
          </label>
          <input type="checkbox" id="checkedbox" ref={el => (this.checkbox = el as HTMLInputElement)} />
          <div class="menu" ref={el => (this.menu = el as HTMLDivElement)}>
            {this.getMenuItems()}
          </div>
        </div>
      </Host>
    );
  }
}
