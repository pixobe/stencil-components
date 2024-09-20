import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pixobe-watermark',
  styleUrl: 'pixobe-watermark.scss',
  shadow: true,
})
export class PixobeWatermark {
  render() {
    return (
      <Host>
        <pixobe-icon icon="pixobe"></pixobe-icon>
        <div><a href="https://pixobe.com" title="Pixobe - Software Development & WordPress Plugins"><span class="tag">pixobe.com</span></a> | <span class="description">Software for every business needs.</span></div>
      </Host>
    );
  }
}
