import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { GridImageProp } from '../image-grid/image-grid';
import { ensureJsonObject } from '../../utils/json-utils';

interface Gallery {
  name: string;
  images?: GridImageProp[];
}

@Component({
  tag: 'p-mediagallery',
  styleUrl: 'media-gallery.scss',
  shadow: true,
})
export class PixobeMediaGalleryElement {
  /** Galleries to render */
  @Prop()
  value: Gallery[] = [];

  /** Number of columns for the inner image grid */
  @Prop()
  cols: number = 8;

  @State()
  private galleries: Gallery[] = [];

  @State()
  private openIndexes: Set<number> = new Set();

  @Event({ eventName: 'imageSelect' })
  imageSelectEvent: EventEmitter<GridImageProp>;

  componentWillLoad() {
    this.normalizeValue(this.value);
  }

  @Watch('value')
  handleValueChange(newValue: Gallery[]) {
    this.normalizeValue(newValue);
  }

  private normalizeValue(rawValue: Gallery[] = []) {
    const parsed = ensureJsonObject(rawValue) || [];
    this.galleries = parsed.map((gallery: Gallery) => ({
      ...gallery,
      images: gallery?.images ?? []
    }));
    // Reset the open panels so new data starts folded
    this.openIndexes = new Set();
  }

  private toggleGallery(index: number) {
    const next = new Set(this.openIndexes);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    this.openIndexes = next;
  }

  private renderEmptyState() {
    return (
      <div class="empty">
        <p class="muted">No galleries to show.</p>
      </div>
    );
  }

  private handleImageSelect = (event: CustomEvent<GridImageProp>) => {
    event.stopPropagation();
    this.imageSelectEvent.emit(event.detail);
  };

  render() {
    if (!this.galleries?.length) {
      return (
        <Host>
          {this.renderEmptyState()}
        </Host>
      );
    }

    return (
      <Host>
        <div class="gallery-accordion">
          {this.galleries.map((gallery, index) => {
            const isOpen = this.openIndexes.has(index);
            const panelId = `gallery-${index}`;
            const bodyId = `${panelId}-body`;

            return (
              <article class={{ "panel": true, open: isOpen }} key={panelId}>
                <button
                  class="panel-trigger"
                  type="button"
                  id={`${panelId}-trigger`}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  onClick={() => this.toggleGallery(index)}
                >
                  <div class="title-block">
                    <span class="eyebrow">Gallery</span>
                    <span class="name">{gallery.name}</span>
                  </div>
                  <div class="meta">
                    <span class="count">{(gallery.images || []).length} photos</span>
                    <span class={{ chevron: true, open: isOpen }} aria-hidden="true"></span>
                  </div>
                </button>

                <div class="panel-body" id={bodyId} role="region" aria-labelledby={`${panelId}-trigger`} aria-hidden={!isOpen}>
                  <div class="grid-shell">
                    <p-imagegrid
                      images={gallery.images || []}
                      cols={this.cols}
                      viewonly={true}
                      onImageSelect={this.handleImageSelect}
                    ></p-imagegrid>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Host>
    );
  }
}
