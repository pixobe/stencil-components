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
        <div>Pixobe</div>
      </Host>
    );
  }
}
