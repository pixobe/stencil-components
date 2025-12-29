import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p-switch',
  styleUrl: 'switch-field.scss',
  shadow: true,
  formAssociated: true
})
export class PixobeSwitchFieldElement {
  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true })
  type: string = 'checkbox';

  @Prop({ reflect: true })
  label?: string;

  @Prop({ reflect: true })
  placeholder?: string;

  @Prop({ mutable: true })
  value: string = 'false';


  @AttachInternals()
  internals!: ElementInternals;

  componentDidLoad() {
    this.internals.setFormValue(this.value);
  }

  onInputFn = (e: Event) => {
    const value = (e.target as HTMLInputElement).checked;
    this.value = String(value);
    this.internals.setFormValue(this.value);
  }

  render() {
    return (
      <Host>
        <label class="switch">
          <input
            class="switch-input"
            id={this.name}
            name={this.name}
            type={this.type}
            onInput={this.onInputFn}
            aria-label={this.label}
            checked={this.value === 'true'}
          />
          <span class="switch-track" aria-hidden="true"></span>
          {this.label ? <span class="switch-label">{this.label}</span> : null}
        </label>
      </Host>
    );
  }
}
