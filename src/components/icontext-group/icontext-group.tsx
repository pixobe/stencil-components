import { Component, Fragment, h, Host, Prop } from '@stencil/core';

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
    const Icon = this.icon;
    return (
      <Host>
        <div class={{ "rounded": this.rounded, "icontext": true }}>
          <Icon></Icon>
        </div>
        {this.label ? <div>{this.label}</div> : <></>}
      </Host >
    );
  }
}
