import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';


@Component({
  tag: 'multi-line',
  styleUrl: 'text-area.scss',
  shadow: true,
  formAssociated: true
})
export class MultiLineText {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true })
  label?: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop()
  required: boolean = true;
  @Prop()
  rows: number = 5;

  @AttachInternals()
  internals!: ElementInternals;

  onInputFn = (e: any) => {
    const value = e.target?.value;
    this.internals.setFormValue(value);
    const event = new CustomEvent('input', {
      detail: { value },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label htmlFor={this.name} class="text-lbl">
            {this.label || this.name}
          </label>
          <div>
            <textarea name={this.name} onInput={this.onInputFn} id={this.name} value={this.value} required={this.required}
              rows={this.rows}></textarea>
          </div>
        </div>
      </Host>
    );
  }
}
