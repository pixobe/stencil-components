import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-close',
})
export class IconClose {
  render() {
    return (
      <Host class="icon">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </Host>
    );
  }
}
