import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-add',
})
export class IconAdd {
  render() {
    return (
      <Host class="icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
      </Host>
    );
  }
}
