
import { AttachInternals, Component, Element, h, Host, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { computePosition, } from 'src/utils/position-utils';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true
})
export class ColorSwatch {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  name!: string;

  @Prop({ reflect: true, mutable: true })
  value: string = '#cacaca';

  @Prop({ reflect: true })
  label?: string;

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  isOpen: boolean = false;

  @Event()
  colorChange: EventEmitter<string>;

  @Event()
  colorInput: EventEmitter<string>;

  colorPickRef: HTMLColorPickerElement;
  buttonRef: HTMLButtonElement;

  componentWillLoad() {
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

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  };

  handleOutsideClick = (event: PointerEvent) => {
    if (!this.colorPickRef?.contains(event.target as Node)) {
      this.isOpen = false;
    }
  };


  toggleColorPicker = (event: PointerEvent): void => {
    event.stopPropagation();
    requestAnimationFrame(() => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        const wrapper = this.el.shadowRoot?.querySelector('.clrpick-wrap')! as HTMLDivElement;
        const computedPosition = computePosition(wrapper);
        wrapper.style.top = computedPosition.top;
        wrapper.style.bottom = computedPosition.bottom;
        wrapper.style.left = computedPosition.left;
        wrapper.style.right = computedPosition.right;
      }
    });
  };

  onColorSelect = (e: any) => {
    const color = e.detail;
    this.value = color;
    this.internals.setFormValue(this.value);
  };

  renderColorPicker = () => {
    return (
      <div class="clrpick-wrap" onClick={e => e.stopPropagation()}>
        {this.isOpen && (
          <color-picker
            ref={el => (this.colorPickRef = el!)}
            onColorChange={e => this.onColorSelect(e)}
            onColorInput={e => this.onColorSelect(e)}
            color={this.value}></color-picker>
        )}
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <button onPointerUp={e => this.toggleColorPicker(e)}
            ref={el => (this.buttonRef = el!)}>
            <div
              class="clr-block"
              style={{ backgroundColor: this.value }}
              title="Pick color"
              role="button">
            </div>
            <label> {this.label}</label>
            {this.renderColorPicker()}
          </button>
        </div>
      </Host >
    );
  }
}
