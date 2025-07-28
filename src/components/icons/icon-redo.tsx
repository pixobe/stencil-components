import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-redo',
})
export class IconRedo {
  render() {
    return (
      <Host class="icon">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z" />
        </svg>
      </Host>
    );
  }
}
