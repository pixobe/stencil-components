import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'check-box',
  styleUrl: 'check-box.scss',
  shadow: true,
  formAssociated: true
})
export class CheckBox {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true })
  label?: string;

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
        <div class="form-element">
          <label htmlFor={this.name} class="text-lbl">
            <input
              type="checkbox"
              name={this.name}
              id={this.name}
              onInput={this.onInputFn}
              aria-label={this.label}
              checked={this.value === 'true'}
            />
            <div class="checkbox" aria-hidden="true">
              <icon-tick></icon-tick>
            </div>
            {this.label}
          </label>
        </div>
      </Host>
    );
  }
}
