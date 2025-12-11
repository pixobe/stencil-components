import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-circle',
  shadow: true
})
export class IconEnvelope {
  render() {
    return (
      <Host>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="currentColor"></circle>
        </svg>
      </Host>
    );
  }
}
