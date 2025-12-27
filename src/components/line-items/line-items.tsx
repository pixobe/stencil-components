import { Component, h, State, Element, Prop, Watch } from '@stencil/core';
import { ensureJsonObject } from '../../utils/json-utils';

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
  items: number[] = [];

  @Prop({ reflect: true })
  name: string;

  @Prop({ reflect: true })
  label: string;

  @Prop({ mutable: true })
  value: any[] = [];

  private internals: ElementInternals;
  private initialValues: any[] | null = null;

  connectedCallback() {
    if ('attachInternals' in this.el) {
      this.internals = (this.el as any).attachInternals();
    }
  }

  private addItem() {
    const nextId = this.items.length === 0 ? 0 : Math.max(...this.items) + 1;
    this.items = [...this.items, nextId];
    this.updateFormValue();
  }

  private deleteItem(itemId: number) {
    if (this.items.length > 1) {
      this.items = this.items.filter((item) => item !== itemId);
      this.updateFormValue();
    }
  }

  private getSlotTemplate() {
    const slot = this.el.querySelector('[slot="template"]');
    return slot ? slot.cloneNode(true) as HTMLElement : null;
  }

  private collectFormData() {
    const data: any[] = [];

    this.items.forEach((itemId) => {
      const slotElement = this.el.querySelector(`[slot="item-${itemId}"]`);
      if (!slotElement) return;
      const formElements = slotElement.querySelectorAll('[name]');
      const itemData: any = {};

      formElements.forEach((element: any) => {
        const name = element.getAttribute('name');
        if (name) {
          if (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio')) {
            itemData[name] = element.checked ? element.value : '';
            return;
          }

          itemData[name] = element.value;
        }
      });

      const hasValue = Object.values(itemData).some((value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim() !== '';
        return true;
      });

      if (hasValue) {
        data.push(itemData);
      }
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

  componentWillLoad() {
    this.value = ensureJsonObject(this.value)
    const normalizedValue = Array.isArray(this.value) ? this.value : [];
    if (normalizedValue.length > 0) {
      this.items = normalizedValue.map((_, index) => index);
      this.initialValues = normalizedValue;
    } else {
      this.items = [0];
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
    const shouldApplyValues = Array.isArray(this.initialValues) && this.initialValues.length > 0;

    this.items.forEach((itemId, index) => {
      const existingSlot = this.el.querySelector(`[slot="item-${itemId}"]`);
      if (!existingSlot) {
        const instance = template.cloneNode(true) as HTMLElement;
        instance.removeAttribute('slot');
        instance.setAttribute('slot', `item-${itemId}`);
        if (shouldApplyValues) {
          const itemValue = this.initialValues?.[index];
          if (itemValue && typeof itemValue === 'object') {
            this.applyTemplateValues(instance, itemValue);
          }
        }
        this.el.appendChild(instance);
      }
    });

    if (shouldApplyValues) {
      this.initialValues = null;
    }

    // Clean up removed items
    const allSlots = this.el.querySelectorAll('[slot^="item-"]');
    allSlots.forEach((slot) => {
      const slotId = parseInt(slot.getAttribute('slot')?.replace('item-', '') || '-1', 10);
      if (!this.items.includes(slotId)) {
        slot.remove();
      }
    });
  }

  private applyTemplateValues(container: HTMLElement, itemValue: Record<string, any>) {
    if (!itemValue || typeof itemValue !== 'object') return;
    const formElements = container.querySelectorAll('[name]');
    formElements.forEach((element) => {
      const name = element.getAttribute('name');
      if (!name || !(name in itemValue)) return;

      const rawValue = itemValue[name];
      if (rawValue === undefined) return;

      if (element instanceof HTMLInputElement) {
        if (element.type === 'checkbox') {
          if (Array.isArray(rawValue)) {
            element.checked = rawValue.map(String).includes(element.value);
          } else if (typeof rawValue === 'boolean') {
            element.checked = rawValue;
          } else if (rawValue === null || rawValue === '') {
            element.checked = false;
          } else {
            element.checked = String(rawValue) === element.value;
          }
          return;
        }

        if (element.type === 'radio') {
          element.checked = String(rawValue) === element.value;
          return;
        }

        element.value = rawValue === null ? '' : String(rawValue);
        return;
      }

      if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
        element.value = rawValue === null ? '' : String(rawValue);
        return;
      }

      if ('value' in element) {
        (element as any).value = rawValue === null ? '' : rawValue;
        return;
      }

      element.setAttribute('value', rawValue === null ? '' : String(rawValue));
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
              <slot name={`item-${item}`}></slot>
            </div>

            <div class="line-item-actions">
              {index === this.items.length - 1 ? (
                <icon-add onClick={() => this.addItem()}></icon-add>
              ) : (
                <icon-trash onClick={() => this.deleteItem(item)}></icon-trash>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

}
