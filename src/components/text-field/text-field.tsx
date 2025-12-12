import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';


@Component({
  tag: 'p-textfield',
  styleUrl: 'text-field.scss',
  shadow: true,
  formAssociated: true
})
export class PixobeTextFieldElement {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true })
  type: string = 'text';

  @Prop({ reflect: true })
  label?: string;

  @Prop({ reflect: false })
  placeholder?: string = '';

  @Prop({ mutable: true })
  value: string = '';

  @Prop()
  required: boolean = true;

  @AttachInternals()
  internals!: ElementInternals;

  componentDidLoad() {
    this.internals.setFormValue(this.value);
  }

  onInputFn = (e: any) => {
    const inputEvent = e as InputEvent;
    const value = (inputEvent.target as HTMLInputElement).value;
    this.value = value;
    this.internals.setFormValue(value);
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label htmlFor={this.name} class="text-lbl">
            {this.label}
          </label>
          <div>
            <input type={this.type} name={this.name} onInput={this.onInputFn} id={this.name} value={this.value} required={this.required} placeholder={this.placeholder} />
          </div>
        </div>
      </Host>
    );
  }
}
