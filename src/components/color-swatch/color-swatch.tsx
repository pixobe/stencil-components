import { AttachInternals, Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'p-colorswatch',
  styleUrl: 'color-swatch.scss',
  shadow: true,
  formAssociated: true
})
export class PixobeColorSwatchesElement {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true, reflect: true })
  value: string = '';

  @Prop({ reflect: true })
  label?: string;

  @State()
  selectedColors: string[] = [];

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.hydrateFromValue(this.value);
    this.syncFormValue();
  }

  @Watch('value')
  handleValueChange(newValue: string) {
    this.hydrateFromValue(newValue);
  }

  private hydrateFromValue(value?: string) {
    this.selectedColors = this.parseValue(value);
  }

  private parseValue(value?: string): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(',')
      .map(color => color.trim())
      .filter(Boolean);
  }

  private syncFormValue() {
    const serializedValue = this.selectedColors.join(',');
    if (this.value !== serializedValue) {
      this.value = serializedValue;
    }
    this.internals?.setFormValue(serializedValue);
  }

  private onColorSelect = (event: CustomEvent<string>) => {
    const rawColor = (event?.detail || '').trim();
    if (!rawColor) {
      return;
    }

    const normalizedColor = rawColor.startsWith('#') ? rawColor.toUpperCase() : rawColor;
    this.selectedColors = [...this.selectedColors, normalizedColor];
    this.syncFormValue();
  };

  private removeColor = (index: number) => {
    this.selectedColors = this.selectedColors.filter((_, swatchIndex) => swatchIndex !== index);
    this.syncFormValue();
  };

  render() {
    return (
      <Host>
        <div class="color-swatch">
          {this.label && <label class="color-swatch__label">{this.label}</label>}
          <div class="color-swatch__grid" role="list">
            {this.selectedColors.length === 0 && (
              <div class="color-swatch__placeholder" role="note">
                Pick a color to add to your palette.
              </div>
            )}
            {this.selectedColors.map((color, index) => (
              <div class="color-swatch__item" role="listitem" key={`${color}-${index}`}>
                <span class="color-swatch__chip" style={{ backgroundColor: color }} aria-label={color}></span>
                <button
                  type="button"
                  class="color-swatch__remove"
                  aria-label={`Remove ${color} from palette`}
                  onPointerUp={() => this.removeColor(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <p-colorpicker onColorChange={this.onColorSelect} name={this.name}></p-colorpicker>
        </div>
      </Host >
    );
  }
}
