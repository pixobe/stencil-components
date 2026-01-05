// pixobe-form.tsx
import { Component, Host, h, Event, EventEmitter, Element, Method } from '@stencil/core';

@Component({
  tag: 'p-form',
  styleUrl: 'pixobe-form.scss',
  shadow: true,
})
export class PixobeFormElement {
  @Element() el: HTMLElement;

  @Event()
  formSubmit: EventEmitter<Record<string, any>>;

  @Method()
  async getFormData() {
    return this.collectFormData();
  }

  componentDidLoad() {
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' && target.getAttribute('type') !== 'button') {
        e.preventDefault();
        this.handleSubmit(e);
      }
    };

    slot.addEventListener('click', handleClick, true);
  }

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    const formData = this.collectFormData();
    this.formSubmit.emit(formData);
  };

  private collectFormData = (): Record<string, any> => {
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (!slot) return {};

    const formData: Record<string, any> = {};
    const elements = slot.assignedElements({ flatten: true });

    // Recursively find all elements with name attribute
    const findNamedElements = (): Element[] => {
      const result: Element[] = [];

      const traverse = (el: Element) => {
        // Skip buttons and ignored elements
        if (el.tagName === 'BUTTON' || (el as HTMLElement).dataset?.ignore !== undefined) {
          return;
        }

        // Collect if has name attribute
        if (el.hasAttribute('name')) {
          result.push(el);
        }

        // Check shadow DOM
        if ((el as HTMLElement).shadowRoot) {
          Array.from((el as HTMLElement).shadowRoot!.children).forEach(traverse);
        }

        // Check light DOM children
        Array.from(el.children).forEach(traverse);
      };

      elements.forEach(traverse);
      return result;
    };

    // Collect values from named elements
    findNamedElements().forEach(el => {
      const name = el.getAttribute('name')!;
      const value = this.getValue(el);

      if (value !== undefined) {
        formData[name] = value;
      }
    });

    return formData;
  };

  private getValue(el: Element): any {
    // Check for native value property
    if ('value' in el) {
      const input = el as HTMLInputElement;

      if (input.type === 'checkbox') return input.checked;
      if (input.type === 'radio') return input.checked ? input.value : undefined;
      return input.value;
    }

    // Check shadow DOM for input elements
    if ((el as HTMLElement).shadowRoot) {
      const input = (el as HTMLElement).shadowRoot!.querySelector(
        'input, select, textarea'
      ) as HTMLInputElement | null;

      if (input) {
        if (input.type === 'checkbox') return input.checked;
        if (input.type === 'radio') return input.checked ? input.value : undefined;
        return input.value;
      }
    }

    return undefined;
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}