import { Component, Host, h, Element, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'image-grid',
  styleUrl: 'image-grid.scss',
  shadow: true,
})
export class ImageGrid {
  @Element() el: HTMLElement;

  /** Array of image URLs */
  @Prop() images: string[] = [];

  @Event({ eventName: "imageDelete" })
  imageDeleteEvent: EventEmitter<string>;

  private observer: IntersectionObserver;

  componentWillLoad() {
    this.initObserver();
  }

  componentDidRender() {
    this.observeImages();
  }

  private initObserver() {
    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (!img.src) {
            img.src = img.getAttribute('data-src')!;
          }
          obs.unobserve(img);
        }
      });
    });
  }

  private observeImages() {
    const imgs = this.el.shadowRoot!.querySelectorAll(".gallery-image");
    imgs.forEach(img => this.observer.observe(img));
  }

  render() {

    if (!this.images?.length) {
      return <Host>Upload images to the gallery.</Host>
    }

    return (
      <Host>
        <div class="grid">
          {this.images.map((src, idx) => (
            <div class="grid-item">
              <img class="gallery-image" data-src={src} alt={`image-${idx}`} src={src} />
              <button class="button-rounded" onClick={() => this.imageDeleteEvent.emit(src)}>
                <icon-close></icon-close>
              </button>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
