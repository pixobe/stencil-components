import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';


@Component({
  tag: 'input-text',
  styleUrl: 'input-text.scss',
  shadow: true,
  formAssociated: true
})
export class InputText {

  @Element()
  el: HTMLElement

  @Prop({ reflect: true })
  name: string;

  @Prop()
  value: string = ''

  @AttachInternals()
  internals: ElementInternals;

  onInputFn = (e) => {
    this.value = e.target.value;
    this.internals.setFormValue(this.value);
    const event = new CustomEvent('input', {
      detail: { value: this.value },
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
            {this.name}
          </label>
          <div>
            <input type="text" name={this.name} onInput={this.onInputFn} id={this.name} value={this.value} />
          </div>
        </div>
      </Host>
    );
  }
}
