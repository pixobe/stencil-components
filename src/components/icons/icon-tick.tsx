import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'icon-tick',
  styleUrl: 'icon-styles.scss',
  shadow: true,
})
export class IconText {
  render() {
    return (
      <Host>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="m9.4501 17.8501 -5.6 -5.6 1.075 -1.075 4.525 4.525 9.6 -9.6 1.075 1.075 -10.675 10.675Z" stroke-width="0.5"></path>
        </svg>
      </Host>
    );
  }
}

