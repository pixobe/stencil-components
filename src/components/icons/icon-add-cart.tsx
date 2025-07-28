import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'icon-add-cart',
  styleUrl: 'icon-styles.scss',
})
export class IconAddCart {
  render() {
    return (
      <Host class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a7.5 7.5 0 0 0-7.5 7.5h15a7.5 7.5 0 0 0-7.5-7.5Zm4.5-10.875c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 0 1 0 1.954l-7.108 4.062A1.125 1.125 0 0 1 12 15.375v-8.5Z"
          />
        </svg>
      </Host>
    );
  }
}
