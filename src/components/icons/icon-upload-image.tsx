import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-upload-image',
})
export class IconImageUpload {
  render() {
    return (
      <Host class="icon">
        <svg fill="none" viewBox="0 0 24 24" width="100%" height="100%">
          <path fill="currentColor" d="M4.5 21c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h15c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v15c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H4.5Zm7.5 -4.325c0.68335 0 1.3 -0.19585 1.85 -0.5875 0.55 -0.39165 1.01665 -0.8875 1.4 -1.4875H19.5V4.5H4.5v10.1h4.25c0.38335 0.6 0.85 1.09585 1.4 1.4875 0.55 0.39165 1.16665 0.5875 1.85 0.5875Zm-0.675 -3.225v-4.725L9.35 10.7l-1.075 -1.075 3.8 -3.8 3.8 3.8 -1.075 1.075 -1.975 -1.975v4.725h-1.5Z" stroke-width="0.5"></path>
        </svg>
      </Host>
    );
  }
}
