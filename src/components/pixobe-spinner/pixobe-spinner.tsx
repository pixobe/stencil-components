import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'pixobe-spinner',
  styleUrl: 'pixobe-spinner.scss',
  shadow: true,
})
export class PixobeSpinner {

  render() {
    return (
      <Host>
        <div class="spinner"></div>
      </Host>
    )
  }
}
