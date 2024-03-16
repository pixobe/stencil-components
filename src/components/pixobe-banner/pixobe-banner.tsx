import { Component, Host, h, Prop } from '@stencil/core';
import { IconEnvelope, IconFacebook, IconPixobe, IconYoutube } from '../icons';

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
            <IconPixobe></IconPixobe>
          </div>
          <h2 class="banner__header">Pixobe</h2>
          <p>
            Visit <a href="https://pixobe.com">pixobe.com</a> to explore more applications and plugins
          </p>
        </div>
        <div class="app-footer">
          <div class="icon">
            <a href="https://facebook.com/pixobe" target="_blank" title="contact pixobe on facebook">
              <IconFacebook></IconFacebook>
            </a>
          </div>
          <div class="icon">
            <a href="https://www.youtube.com/@pixobe" target="_blank" title="watch videos by pixobe">
              <IconYoutube></IconYoutube>
            </a>
          </div>
          <div class="icon">
            <a href="mailto:email@pixobe.com" title="email@pixobe.com" target="_blank">
              <IconEnvelope></IconEnvelope>
            </a>
          </div>
        </div>
      </Host>
    );
  }
}
