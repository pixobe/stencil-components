import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'pixobe-banner',
  styleUrl: 'pixobe-banner.scss',
  shadow: true,
})
export class PixobeBanner {
  @Prop()
  name: string = 'Pixobe';

  render() {
    return (
      <Host>
        <div class="flex flex-col gap has-base-background">
          <div class="flex gap item-center justify-center  box-sizing p-1">
            <pixobe-icon icon="pixobe"></pixobe-icon>
            <h2>PIXOBE</h2>
          </div>
          <div class="flex flex-col item-center justify-between box-sizing p-1  bg-blur ">
            <div><p><a href="https://pixobe.com" title="Pixobe - Software Development and consultancy"><span class="tag">Explore Plugins and Apps</span></a> | <span>Software for your business needs</span></p></div>
            <div class="flex  gap-1 item-center justify-center icon-sm ">
              <a href="https://facebook.com/pixobe" target="_blank" title="Follow Pixobe on Facebook for WordPress, Wix, and Shopify custom apps and plugins">
                <pixobe-icon icon="facebook" aria-label="Pixobe Facebook"></pixobe-icon>
              </a>
              <a href="https://youtube.com/pixobe" target="_blank" title="Subscribe to Pixobe on YouTube for tutorials on WordPress, Wix, and Shopify custom apps">
                <pixobe-icon icon="youtube" aria-label="Pixobe YouTube"></pixobe-icon>
              </a>
              <a href="mailto:email@pixobe.com" title="Email Pixobe for inquiries about WordPress, Wix, and Shopify custom apps">
                <pixobe-icon icon="envelope" aria-label="Email Pixobe"></pixobe-icon>
              </a>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
