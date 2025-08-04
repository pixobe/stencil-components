import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h
} from "@stencil/core";
import { getPosition } from './wrapper-util';

@Component({
  tag: 'colorpicker-wrapper',
  styleUrl: 'colorpicker-wrapper.scss',
  shadow: true,
})
export class ColorpickerWrapper {

  @Element()
  el: HTMLElement;

  connectedCallback() {
    const parent = this.el.parentElement;
    parent?.addEventListener("click", () => {
      const colorPicker = document.createElement("color-picker")
      document.body.appendChild(colorPicker);
      colorPicker.style.position = "sticky";
      colorPicker.style.bottom = "0";
      colorPicker.style.left = "0";
    });
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
