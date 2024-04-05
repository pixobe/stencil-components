import { Component, Host, h, Prop } from '@stencil/core';

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
        <div class="banner">
          <div class="banner__icon">
             <icon-pixobe></icon-pixobe>
          </div>
          <h2 class="banner__header">Pixobe</h2>
          <p>
            Visit <a href="https://pixobe.com">pixobe.com</a> to explore more applications and plugins
          </p>
        </div>
        <div class="app-footer">
          <div>Copyright © {new Date().getFullYear()} - All right reserved</div>
          <div class="social">
            <div class="icon">
              <a href="https://facebook.com/pixobe" target="_blank" title="contact pixobe on facebook">
                 <icon-facebook></icon-facebook>
              </a>
            </div>
            <div class="icon">
              <a href="https://www.youtube.com/@pixobe" target="_blank" title="watch videos by pixobe">
                 <icon-youtube></icon-youtube>
              </a>
            </div>
            <div class="icon">
              <a href="mailto:email@pixobe.com" title="email@pixobe.com" target="_blank">
                 <icon-envelope></icon-envelope>
              </a>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
