
import { AttachInternals, Component, Element, h, Host, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { computePosition, TPosition } from 'src/utils/position-utils';

@Component({
  tag: 'color-input',
  styleUrl: 'color-input.scss',
  shadow: true,
  formAssociated: true,
})
export class ColorInput {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true, mutable: true })
  name!: string;

  @Prop({ reflect: true, mutable: true })
  value: string;

  @Prop({ mutable: true })
  swatches: string;

  @Prop({ reflect: true })
  label?: string;

  @Prop()
  appearance: 'checkbox' | 'input' = 'checkbox';

  @Prop()
  editable: string | undefined = 'false';

  @AttachInternals()
  internals!: ElementInternals;

  @State()
  isOpen: boolean = false;

  @State()
  computedPosition: TPosition = { top: '100%', left: '0', bottom: 'auto', right: 'auto' };

  @Event()
  colorChange: EventEmitter<string>;

  @Event()
  colorInput: EventEmitter<string>;

  @State()
  swatchList: string[] = [];

  @State()
  selectedColor: string;

  colorPickRef: HTMLColorPickerElement;

  connectedCallback() {
    this.selectedColor = this.value;
  }

  componentWillLoad() {
    if (this.swatches) {
      this.swatchList = this.swatches.split(",");
    }
    const value = this.editable ? this.swatches : this.value;
    this.internals.setFormValue(value);
  }

  componentDidLoad() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  };

  handleOutsideClick = (event: MouseEvent) => {
    if (!this.el?.contains(event.target as Node)) {
      this.isOpen = false;
    }
  };

  onColorSelect = (e: any) => {
    this.selectedColor = e.detail;
    if (!this.editable) {
      this.value = this.selectedColor;
      this.internals.setFormValue(this.value);
    }
  };

  onSwatchChange(e: CustomEvent) {
    this.swatchList = e.detail;
    const swatches = this.swatchList.join(",");
    this.value = swatches;
    this.internals.setFormValue(this.value);
  }

  toggleColorPicker = (event: MouseEvent): void => {
    event.stopPropagation();
    requestAnimationFrame(() => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        const wrapper = this.el.shadowRoot?.querySelector('.clrpick-wrap')! as HTMLDivElement;
        this.computedPosition = computePosition(wrapper);
        wrapper.style.top = this.computedPosition.top;
        wrapper.style.bottom = this.computedPosition.bottom;
        wrapper.style.left = this.computedPosition.left;
        wrapper.style.right = this.computedPosition.right;
      }
    });
  };

  renderColorPicker = () => {
    return (
      <div class="clrpick-wrap" onClick={e => e.stopPropagation()}>
        {this.isOpen && (
          <color-picker
            ref={el => (this.colorPickRef = el!)}
            onColorChange={e => this.onColorSelect(e)}
            onColorInput={e => this.onColorSelect(e)}
            swatches={this.swatchList}
            editMode={this.editable === 'true'}
            onSwatchChange={(e) => this.onSwatchChange(e)}
            color={this.value}></color-picker>
        )}
      </div>
    )
  }

  render() {
    if (this.appearance === 'input') {
      return (
        <Host>
          <div class="form-element vertical">
            <button class="clr-button" title={'Color Picker'}
              onClick={e => this.toggleColorPicker(e)}
              role="button">
              <label htmlFor={this.name} class="text-lbl">
                {this.label}
              </label>
              <div class="wrap-svg" style={{ "--current-color": this.selectedColor }}>
                <svg height="32" width="100%" viewBox="0 0 40 30" fill="none" preserveAspectRatio="none">
                  <rect width="40" height="30" fill="currentColor" />
                </svg>
              </div>
            </button>
            {this.renderColorPicker()}
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class="form-element horizontal">
          <button class="clr-button"
            title={'Color Picker'}
            onClick={e => this.toggleColorPicker(e)}
            role="button">
            <div class="wrap-svg" style={{ "--current-color": this.selectedColor }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" fill="currentColor" rx="4"></rect>
              </svg>
            </div>
            <label>{this.label}</label>
          </button>
          {this.renderColorPicker()}
        </div>
      </Host>
    );
  }
}
