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

  componentDidLoad() {
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
        <div class="checkbox-wrapper">
          <input
            class="inp-cbx"
            id={this.name}
            type="checkbox"
            onInput={this.onInputFn}
            aria-label={this.label}
            checked={this.value === 'true'}
          />
          <label class="cbx" htmlFor={this.name}><span>
            <svg width="12px" height="10px">
              <use xlinkHref="#check"></use>
            </svg></span><span>{this.label}</span></label>
          <svg class="inline-svg">
            <symbol id="check" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </symbol>
          </svg>
        </div>
      </Host>
    );
  }
}
