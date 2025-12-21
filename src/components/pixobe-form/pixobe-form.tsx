// pixobe-form.tsx
import { Component, Host, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'p-form',
  styleUrl: 'pixobe-form.scss',
  shadow: true,
})
export class PixobeFormElement {
  @Element() el: HTMLElement;

  @Event() formSubmit: EventEmitter<Record<string, any>>;

  formElement: HTMLFormElement;

  componentDidLoad() {
    // Attach click listeners to slotted submit buttons
    const slot = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;

    const attachListeners = () => {
      const slottedElements = slot.assignedElements({ flatten: true });

      // Find all submit buttons in slotted content
      const findSubmitButtons = (elements: Element[]): HTMLButtonElement[] => {
        const buttons: HTMLButtonElement[] = [];

        elements.forEach(element => {
          if (element instanceof HTMLButtonElement && element.type === 'submit') {
            buttons.push(element);
          }
          // Also check children
          if (element.children.length > 0) {
            buttons.push(...findSubmitButtons(Array.from(element.children)));
          }
        });

        return buttons;
      };

      const submitButtons = findSubmitButtons(slottedElements);

      submitButtons.forEach(button => {
        button.addEventListener('click', this.handleButtonClick);
      });
    };

    // Attach listeners initially
    attachListeners();

    // Re-attach when slot changes
    slot.addEventListener('slotchange', attachListeners);
  }

  private handleButtonClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.collectAndEmitFormData();
  };

  private handleSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.collectAndEmitFormData();
  };

  private collectAndEmitFormData = () => {
    // Get all slotted elements
    const slot = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
    const slottedElements = slot.assignedElements({ flatten: true });
    // Collect form data
    const formData: Record<string, any> = {};

    // Process each slotted element
    const collectFormData = (elements: Element[]) => {
      elements.forEach(element => {
        // Skip buttons
        if (element instanceof HTMLButtonElement) {
          return;
        }

        const ignore = (element as HTMLInputElement).dataset.ignore;

        if (ignore !== undefined) {
          return;
        }

        // Check if element has a name attribute
        const name = element.getAttribute('name');

        if (name) {
          let value: any;

          // Check if element has a value property (custom components)
          if ('value' in element) {
            value = (element as any).value;
          }
          // Handle native input elements
          else if (element instanceof HTMLInputElement) {
            if (element.type === 'checkbox') {
              value = element.checked;
            } else if (element.type === 'radio') {
              if (element.checked) {
                value = element.value;
              } else {
                return; // Skip unchecked radio buttons
              }
            } else {
              value = element.value;
            }
          } else if (element instanceof HTMLSelectElement) {
            value = element.value;
          } else if (element instanceof HTMLTextAreaElement) {
            value = element.value;
          }
          // Try to get value from shadow DOM input
          else if (element.shadowRoot) {
            const input = element.shadowRoot.querySelector('input, select, textarea') as HTMLInputElement;
            if (input) {
              value = input.type === 'checkbox' ? input.checked : input.value;
            }
          }

          if (value !== undefined) {
            formData[name] = value;
          }
        }

        // Check direct children (not in shadow DOM)
        if (element.children.length > 0) {
          collectFormData(Array.from(element.children));
        }
      });
    };

    collectFormData(slottedElements);

    this.formSubmit.emit(formData);
  };

  disconnectedCallback() {
    // Clean up event listeners
    const slot = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (slot) {
      const slottedElements = slot.assignedElements({ flatten: true });
      const findSubmitButtons = (elements: Element[]): HTMLButtonElement[] => {
        const buttons: HTMLButtonElement[] = [];
        elements.forEach(element => {
          if (element instanceof HTMLButtonElement && element.type === 'submit') {
            buttons.push(element);
          }
          if (element.children.length > 0) {
            buttons.push(...findSubmitButtons(Array.from(element.children)));
          }
        });
        return buttons;
      };

      const submitButtons = findSubmitButtons(slottedElements);
      submitButtons.forEach(button => {
        button.removeEventListener('click', this.handleButtonClick);
      });
    }
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit} ref={el => this.formElement = el}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}