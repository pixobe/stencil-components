import { Component, Host, h, Element, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';
import { ensureJsonObject } from '../../utils/json-utils';

export type GridImageProp = { url: string }

@Component({
  tag: 'p-imagegrid',
  styleUrl: 'image-grid.scss',
  shadow: true,
})
export class PixobeImageGridElement {
  @Element() el: HTMLElement;

  /** Array of image URLs */
  @Prop()
  images: Array<GridImageProp> = [];

  /** Array of image URLs */
  @Prop()
  cols: number = 8

  @Prop()
  viewonly: boolean;

  @State()
  private processedImages: Array<GridImageProp> = [];

  @Event({ eventName: "imageDelete" })
  imageDeleteEvent: EventEmitter<GridImageProp>;

  @Event({ eventName: "imageSelect" })
  imageSelectEvent: EventEmitter<GridImageProp>;

  private observer: IntersectionObserver;

  componentWillLoad() {
    this.processedImages = ensureJsonObject(this.images);
    this.initObserver();
  }

  @Watch('images')
  handleImagesChange(newImages: Array<GridImageProp>) {
    this.processedImages = ensureJsonObject(newImages);
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

  private onImageSelectEvent(image: GridImageProp) {
    this.imageSelectEvent.emit(image);
  }

  render() {
    if (!this.processedImages?.length) {
      return <Host>Upload images to the gallery.</Host>
    }
    return (
      <Host class={{ "view-only": this.viewonly }}
        style={{
          "--grid-cols": `${this.cols}`
        }}>
        <div class="grid">
          {this.processedImages.map((image, idx) => (
            <div class="grid-item" key={`${image.url}_${idx}`}>
              <button onClick={() => this.onImageSelectEvent(image)}>
                <img class="gallery-image" data-src={image.url} alt={`image-${idx}`} />
              </button>
              <button class="button-rounded button-delete" onClick={() => this.imageDeleteEvent.emit(image)}>
                <icon-close></icon-close>
              </button>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}