import {
  AttachInternals,
  Component,
  Element,
  h,
  Host,
  Prop,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import { computePosition } from 'src/utils/position-utils';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true,
})
export class ColorInput {
  @Element() el: HTMLElement;

  @Prop({ reflect: true }) name!: string;
  @Prop({ reflect: true, mutable: true }) value: string = '#cacaca';
  @Prop({ reflect: true }) label?: string;

  @AttachInternals() internals!: ElementInternals;

  @State() isOpen: boolean = false;

  @Event() colorChange: EventEmitter<string>;
  @Event() colorSelect: EventEmitter<string>;

  private colorPickRef: HTMLColorPickerElement;
  private buttonRef: HTMLButtonElement;

  componentWillLoad() {
    // Initialize form value
    this.internals.setFormValue(this.value);
  }

  componentDidLoad() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('pointerup', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('pointerup', this.handleOutsideClick);
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') this.isOpen = false;
  };

  private handleOutsideClick = (event: PointerEvent) => {
    if (!this.el.contains(event.target as Node)) {
      this.isOpen = false;
    }
  };

  private toggleColorPicker = (event: PointerEvent) => {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      requestAnimationFrame(() => {
        const wrapper = this.el.shadowRoot?.querySelector('.clrpick-wrap') as HTMLDivElement;
        if (wrapper) {
          const pos = computePosition(wrapper);
          Object.assign(wrapper.style, {
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right,
          });
        }
      });
    }
  };

  private onColorChange = (event: CustomEvent<string>) => {
    const color = event.detail;
    requestAnimationFrame(() => {
      this.value = color;
      this.internals.setFormValue(this.value);
      this.colorChange.emit(this.value);
    });
  };

  private renderColorPicker = () => (
    <div class="clrpick-wrap" onClick={e => e.stopPropagation()}>
      {this.isOpen && (
        <color-picker
          ref={el => (this.colorPickRef = el!)}
          color={this.value}
          onColorChange={this.onColorChange}
        ></color-picker>
      )}
    </div>
  );

  render() {
    return (
      <Host>
        <div class="form-element">
          <button
            ref={el => (this.buttonRef = el!)}
            onPointerUp={e => this.toggleColorPicker(e)}
            type="button"
          >
            <div
              class="clr-block"
              style={{ backgroundColor: this.value }}
              title="Pick color"
              role="button"
            />
            <label>{this.label}</label>
            {this.renderColorPicker()}
          </button>
        </div>
      </Host>
    );
  }
}
