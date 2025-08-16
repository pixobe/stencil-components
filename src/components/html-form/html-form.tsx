import { Component, Host, h, Method, Prop, Element, Watch } from '@stencil/core';
import { getValueByPath, valueMapper } from './form-utils';

@Component({
  tag: 'html-form',
  styleUrl: 'html-form.scss',
  shadow: true
})
export class HtmlForm {

  @Element()
  el: HTMLElement

  @Prop({ mutable: true, reflect: true })
  data: Record<string, any>;

  ref: HTMLFormElement;

  @Watch("data")
  onDataChanges(newData: Record<string, any>) {
    this.setValue(newData);
  }

  @Method()
  async formData() {
    const data: Record<string, any> = {};
    const formElements = this.getFormElements();
    for (const el of formElements) {
      valueMapper(data, el.name, el.value);
    }
    return data;
  }

  componentDidLoad() {
    this.setValue(this.data);
  }

  setValue = (data: Record<string, any>) => {
    const formElements = this.getFormElements();
    if (formElements) {
      for (const element of formElements) {
        const name = (element! as HTMLInputElement).name;
        if (name) {
          const value = getValueByPath(data, name);
          element.value = value;
        }
      }
    }
  }

  getFormElements() {
    const slot = this.el.shadowRoot?.querySelector("slot");
    const assignedElements = slot!.assignedElements({ flatten: true }) as HTMLInputElement[];
    const formElements: HTMLInputElement[] = assignedElements
      .flatMap(el => {
        if ((el as any).formAssociated) {
          return [el];
        }
        if ((el as HTMLInputElement).name) {
          return [el as HTMLInputElement];
        }
        return Array.from(el.querySelectorAll<HTMLInputElement>('input, select, textarea, [name]'));
      })
      .filter(el => !!el.name && el.dataset.ignore === undefined);
    return formElements;
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
