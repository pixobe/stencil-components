import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'p-section',
  styleUrl: 'page-section.scss',
  shadow: true,
})
export class PixobePageSectionElement {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
