import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'p-spinner',
  styleUrl: 'pixobe-spinner.scss',
  shadow: true,
})
export class PixobeSpinnerElement {

  @Prop({ mutable: true })
  header?: string;

  @Prop({ mutable: true })
  message?: string;

  render() {
    return (
      <Host>
        <icon-spinner></icon-spinner>
        {this.header && <h3>{this.header}</h3>}
        {this.message && <p>{this.message}</p>}
      </Host>
    )
  }
}
