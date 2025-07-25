import { Component, Host, h, Method, Prop, Element } from '@stencil/core';
import { getValueByPath, valueMapper } from './form-utils';

@Component({
  tag: 'html-form',
  styleUrl: 'html-form.scss',
  shadow: true
})
export class HtmlForm {

  @Element()
  el: HTMLElement

  @Prop()
  data: Record<string, any> = {}

  ref: HTMLFormElement;

  @Method()
  async formData() {
    const data: Record<string, any> = {};
    const slot = this.ref.querySelector("slot");
    const assignedElements = slot?.assignedElements({ flatten: true }) as Array<HTMLInputElement> || [];

    const formElements: HTMLInputElement[] = assignedElements
      .flatMap(el => {
        if ((el as HTMLInputElement).name) return [el as HTMLInputElement];
        return Array.from(el.querySelectorAll<HTMLInputElement>('input, select, textarea, [name]'));
      })
      .filter(el => !!el.name && el.dataset.ignore === undefined)

    for (const el of formElements) {
      valueMapper(data, el.name, el.value);
    }
    return data;
  }

  componentDidLoad() {
    const slot = this.el.shadowRoot?.querySelector("slot");
    const assignedElements = slot!.assignedElements({ flatten: true }) as HTMLInputElement[];

    const formElements: HTMLInputElement[] = assignedElements
      .flatMap(el => {
        if ((el as HTMLInputElement).name) return [el as HTMLInputElement];
        return Array.from(el.querySelectorAll<HTMLInputElement>('input, select, textarea, [name]'));
      })
      .filter(el => !!el.name && el.dataset.ignore === undefined);

    if (formElements) {
      for (const element of formElements) {
        const name = (element! as HTMLInputElement).name;
        if (name) {
          const value = getValueByPath(this.data, name);
          element.value = value;
        }
      }
    }
  }



  render() {
    return (
      <Host>
        <form ref={(el) => this.ref = el as HTMLFormElement}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}
