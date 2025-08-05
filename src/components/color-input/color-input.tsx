import { AttachInternals, Component, Host, h, Prop, Element, State } from '@stencil/core';
import { wrap } from 'module';
import { computePosition, TPosition } from 'src/utils/position-utils';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true
})
export class ColorInput {

  @Element()
  el: HTMLElement;

  @Prop({ reflect: true, mutable: true })
  name!: string;

  @Prop({ mutable: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @Prop({ reflect: true })
  theme: 'checkbox' | 'input' | 'swatch' = 'checkbox';

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  toggle: boolean = false;

  @State()
  computedPosition: TPosition = { top: "100%", left: "0", bottom: "auto", right: "auto" };


  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onColorSelect = (e: any) => {
    const value = e.detail;
    this.value = value;
    this.internals.setFormValue(value);
  }

  toggleColorPicker(): void {
    requestAnimationFrame(() => {
      this.toggle = !this.toggle;
      const button = this.el.shadowRoot?.querySelector("button")!;
      const wrapper = this.el.shadowRoot?.querySelector(".clrpick-wrap")! as HTMLDivElement;
      this.computedPosition = computePosition(button);
      wrapper.style.top = this.computedPosition.top;
      wrapper.style.bottom = this.computedPosition.bottom;
      wrapper.style.left = this.computedPosition.left;
      wrapper.style.right = this.computedPosition.right;
    })
  }

  render() {
    return (
      <Host>
        <div class='clr'>
          <button
            title={'Color Picker'}
            onClick={() => this.toggleColorPicker()}
            style={{ color: this.value }}
            role="button"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" fill="currentColor" rx="4"></rect>
            </svg>
            <label>{this.label}</label>
          </button>
          <div class="clrpick-wrap">
            {this.toggle && <color-picker></color-picker>}
          </div>
        </div>
      </Host>
    );
  }
}
