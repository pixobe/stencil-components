import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-arrow',
})
export class IconArrow {
  render() {
    return (
      <Host class="icon">
        <svg width="100%" height="100%" viewBox="0 0 122.88 122.433" enable-background="new 0 0 122.88 122.433" xmlSpace="preserve" fill="currentColor">
          <polygon fill-rule="evenodd" clip-rule="evenodd" points="122.88,61.217 59.207,122.433 59.207,83.029 0,83.029 0,39.399 59.207,39.399 59.207,0 122.88,61.217" />
        </svg>
      </Host>
    );
  }
}
