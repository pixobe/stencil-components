import { Component, h, State, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'p-lineitems',
  styleUrl: 'line-items.scss',
  shadow: true,
  formAssociated: true,
})
export class PixobeLineItemsElement {
  @Element()
  el: HTMLElement;

  @State()
  items: number[] = [0];

  @Prop({ reflect: true })
  name: string;

  @Prop({ reflect: true })
  label: string;

  @Prop({ mutable: true })
  value: any[] = [];

  private internals: ElementInternals;

  connectedCallback() {
    if ('attachInternals' in this.el) {
      this.internals = (this.el as any).attachInternals();
    }
  }

  private addItem() {
    this.items = [...this.items, this.items.length];
    this.updateFormValue();
  }

  private deleteItem(index: number) {
    console.log("Item index", index);
    if (this.items.length > 1) {
      this.items.splice(index, 1);
      this.value.splice(index, 1)
      this.updateFormValue();
    }
  }

  private getSlotTemplate() {
    const slot = this.el.querySelector('[slot="template"]');
    return slot ? slot.cloneNode(true) as HTMLElement : null;
  }

  private collectFormData() {
    const data: any[] = [];

    this.items.forEach((_, index) => {
      const slotElement = this.el.querySelector(`[slot="item-${index}"]`);
      if (!slotElement) return;
      const formElements = slotElement.querySelectorAll('[name]');
      const itemData: any = {};

      formElements.forEach((element: any) => {
        const name = element.getAttribute('name');
        if (name) {
          itemData[name] = element.value;
        }
      });

      data.push(itemData);
    });

    return data;
  }

  private updateFormValue() {
    setTimeout(() => {
      this.value = this.collectFormData();
      if (this.internals) {
        this.internals.setFormValue(JSON.stringify(this.value));
      }
    }, 0);
  }

  private handleInput = () => {
    this.updateFormValue();
  };

  @Watch('value')
  valueChanged() {
    if (this.internals) {
      this.internals.setFormValue(JSON.stringify(this.value));
    }
  }


  componentDidLoad() {
    this.renderTemplateInstances();
    this.attachFormListeners();
  }

  componentDidUpdate() {
    this.renderTemplateInstances();
    this.attachFormListeners();
  }

  private renderTemplateInstances() {
    const template = this.getSlotTemplate();
    if (!template) return;

    this.items.forEach((_, index) => {
      const existingSlot = this.el.querySelector(`[slot="item-${index}"]`);
      if (!existingSlot) {
        const instance = template.cloneNode(true) as HTMLElement;
        instance.removeAttribute('slot');
        instance.setAttribute('slot', `item-${index}`);
        this.el.appendChild(instance);
      }
    });

    // Clean up removed items
    const allSlots = this.el.querySelectorAll('[slot^="item-"]');
    allSlots.forEach((slot) => {
      const slotIndex = parseInt(slot.getAttribute('slot')?.replace('item-', '') || '-1');
      if (slotIndex >= this.items.length) {
        slot.remove();
      }
    });
  }

  private attachFormListeners() {
    const formElements = this.el.querySelectorAll('[name]');
    formElements.forEach((element) => {
      element.removeEventListener('input', this.handleInput);
      element.addEventListener('input', this.handleInput);
    });
  }

  render() {
    return (
      <div class="line-items-container">
        {this.label && <label>{this.label}</label>}
        <div class="template-slot">
          <slot name="template"></slot>
        </div>

        {this.items.map((item, index) => (
          <div class="line-item" key={item}>
            <div class="line-item-content">
              <slot name={`item-${index}`}></slot>
            </div>

            <div class="line-item-actions">
              {index === this.items.length - 1 ? (
                <icon-add onClick={() => this.addItem()}></icon-add>
              ) : (
                <icon-trash onClick={() => this.deleteItem(index)}></icon-trash>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

}