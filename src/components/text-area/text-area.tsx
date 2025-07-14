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

  @Prop({ reflect: false })
  placeholder?: string = '';

  @Prop({ mutable: true })
  value: string = '';

  @Prop()
  required: boolean = true;
  @Prop()
  rows: number = 5;

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onInputFn = (e: any) => {
    const inputEvent = e as InputEvent;
    const value = (inputEvent.target as HTMLTextAreaElement).value;
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
            <textarea
              name={this.name}
              onInput={this.onInputFn}
              id={this.name}
              value={this.value}
              required={this.required}
              placeholder={this.placeholder}
              rows={this.rows}></textarea>
          </div>
        </div>
      </Host>
    );
  }
}
