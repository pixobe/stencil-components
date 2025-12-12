import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'icontext-group',
  styleUrl: 'icontext-group.scss',
  shadow: true,
})
export class IcontextGroup {

  @Prop()
  icon!: string;

  @Prop()
  label!: string;

  @Prop()
  rounded: boolean = false;

  render() {
    const T = this.icon;
    return (
      <Host class={{ 'rounded': this.rounded }}>
        <div class="wrapper">
          <T />
        </div>
        <label>{this.label}</label>
      </Host >
    );
  }
}
