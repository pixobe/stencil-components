import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p-checkbox',
  styleUrl: 'check-box.scss',
  shadow: true,
  formAssociated: true
})
export class PixobeCheckBoxElement {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop()
  label?: string;

  @Prop()
  details?: string;

  @Prop({ mutable: true })
  value: string = 'false';

  @Prop()
  required: boolean = true;

  type = 'checkbox';

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onInputFn = (e: any) => {
    const inputEvent = e as InputEvent;
    const value = (inputEvent.target as HTMLInputElement).checked;
    this.value = String(value);
    this.internals.setFormValue(this.value);
  }

  render() {
    return (
      <Host>
        <label htmlFor={this.name}>
          <input
            type="checkbox"
            name={this.name}
            id={this.name}
            onInput={this.onInputFn}
            aria-label={this.label}
            checked={this.value === 'true'}
          />
          <span>{this.label}</span>
        </label>
        <p>
          {this.details}
        </p>
      </Host>
    );
  }
}
