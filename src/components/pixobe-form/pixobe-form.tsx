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

  formElement: HTMLFormElement;

  @Method()
  async getFormData() {
    return this.collectFormData()
  }

  componentDidLoad() {
    const slot = this.getSlot();
    if (!slot) return;

    const attachListeners = () => {
      this.getSubmitButtons(slot).forEach(button =>
        button.addEventListener('click', this.handleButtonClick),
      );
    };

    attachListeners();
    slot.addEventListener('slotchange', attachListeners);
  }

  disconnectedCallback() {
    const slot = this.getSlot();
    if (!slot) return;

    this.getSubmitButtons(slot).forEach(button =>
      button.removeEventListener('click', this.handleButtonClick),
    );
  }

  private getSlot(): HTMLSlotElement | null {
    return this.el.shadowRoot?.querySelector('slot') ?? null;
  }

  private getSubmitButtons(slot: HTMLSlotElement): HTMLButtonElement[] {
    const buttons = slot
      .assignedElements({ flatten: true })
      .flatMap(el => {
        // If the assigned element itself is a button, include it
        const self = el.tagName === 'BUTTON' ? [el] : [];
        // Find all nested buttons inside this assigned element (e.g., inside your div)
        const nested = Array.from(el.querySelectorAll('button'));
        return [...self, ...nested];
      }) as HTMLButtonElement[];
    return buttons;
  }

  private handleButtonClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.collectFormData();
  };

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = this.collectFormData();
    this.formSubmit.emit(formData);
  };

  private collectFormData = () => {
    const slot = this.getSlot();
    if (!slot) return;

    const formData: Record<string, any> = {};
    const visited = new Set<Element>();

    const hasName = (el: Element): el is Element & { name: string } =>
      el.hasAttribute('name');

    const resolveValue = (el: Element): any => {
      // Native value
      if ('value' in el) {
        const input = el as HTMLInputElement;

        if (input.type === 'checkbox') return input.checked;
        if (input.type === 'radio') return input.checked ? input.value : undefined;
        return (el as any).value;
      }

      // Shadow DOM value
      if ((el as HTMLElement).shadowRoot) {
        const inner = (el as HTMLElement).shadowRoot!.querySelector(
          'input, select, textarea',
        ) as HTMLInputElement | null;

        if (!inner) return undefined;

        if (inner.type === 'checkbox') return inner.checked;
        if (inner.type === 'radio')
          return inner.checked ? inner.value : undefined;

        return inner.value;
      }

      return undefined;
    };

    const collect = (elements: Element[]) => {
      elements.forEach(el => {
        if (visited.has(el)) return;
        visited.add(el);

        if (
          el instanceof HTMLButtonElement ||
          (el as HTMLElement).dataset?.ignore !== undefined
        ) {
          return;
        }

        if (hasName(el)) {
          const name = el.getAttribute('name')!;
          const value = resolveValue(el);

          if (value !== undefined) {
            formData[name] = value;
          }
        }

        if ((el as HTMLElement).shadowRoot) {
          collect(Array.from((el as HTMLElement).shadowRoot!.children));
        }

        if (el.children.length) {
          collect(Array.from(el.children));
        }
      });
    };

    collect(slot.assignedElements({ flatten: true }));
    return formData;
  };


  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit} ref={el => (this.formElement = el!)}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}
