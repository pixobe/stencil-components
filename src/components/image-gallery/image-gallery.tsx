import { Component, Host, h, State, Prop, Event, EventEmitter, AttachInternals } from '@stencil/core';
import { GridImageProp } from '../image-grid/image-grid';

declare const wp: any;

interface Gallery {
  name: string;
  images: GridImageProp[];
}


@Component({
  tag: 'image-gallery',
  styleUrl: 'image-gallery.scss',
  shadow: true,
  formAssociated: true
})
export class ImageGallery {

  @Prop({ reflect: true })
  name!: string;

  @Prop({ mutable: true })
  value: Gallery[] = [];

  @Prop()
  viewonly: boolean = false;

  @Prop()
  platform: string = "wp";

  @State()
  newGalleryName: string = '';

  @Event()
  mediaFrameEvent: EventEmitter<{ name: string }>;

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  componentDidRender() {
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  private handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newGalleryName = target.value;
  }

  private addGallery() {
    const name = this.newGalleryName.trim();
    if (!name) return;
    this.value = [{ name, images: [] }, ...this.value];
    this.newGalleryName = '';
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  private deleteGallery(galleryIndex: number) {
    const newGallery = this.value.filter((_, index) => index !== galleryIndex);
    this.value = [...newGallery];
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addGallery();
    }
  }

  private uploadImages(gallery: Gallery) {
    if (this.platform === 'wp') {
      this.uploadWordPress(gallery);
    }
  }

  private deleteImage(galleryIndex: number, selectedImage: GridImageProp) {
    const newGallery = [...this.value];
    newGallery[galleryIndex] = {
      ...newGallery[galleryIndex],
      images: newGallery[galleryIndex].images.filter(img => img !== selectedImage)
    };
    this.value = newGallery;
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  /**
   * 
   * @param e 
   * @returns 
   */
  private uploadWordPress(gallery: Gallery) {
    if (!gallery) {
      alert("Gallery name is required.");
      return;
    }

    if (!wp) {
      alert("Unable to find Wordpress Environment");
    }

    const frame = wp.media({
      title: "Select Image",
      button: {
        text: "Use this image",
      },
      multiple: "add",
      library: {
        type: "image",
      },
    });

    frame.on("select", () => {
      // Get media attachment details from the frame state
      const attachments = frame.state().get("selection").toJSON();
      if (attachments.length > 0) {
        const images = attachments.map((attachment: any) => ({ src: attachment.url }));
        gallery.images = [...gallery.images, ...images];
        this.value = [...this.value];
      }
    });
    frame.open();
  }

  render() {
    return (
      <Host class={{ "view-only": this.viewonly }}>
        <div class="gallery-container">
          <div class="gallery-input">
            <input
              type="text"
              placeholder="Enter gallery name"
              value={this.newGalleryName}
              onInput={(e) => this.handleNameInput(e)}
              onKeyDown={(e) => this.handleKeyDown(e)}
            />
            <button onClick={() => this.addGallery()}>Add Gallery</button>
          </div>

          <div class="gallery-list">
            {this.value?.length === 0 ? (
              <p class="empty-message">No galleries yet.</p>
            ) : (
              this.value?.map((gallery, index) => (
                <div class="gallery-item" key={index}>
                  <div class="gallery-header">
                    <h3>{gallery.name}</h3>
                    <div class="button-group button-actions">
                      <button onClick={() => this.uploadImages(gallery)}>
                        <icon-add-image></icon-add-image>
                      </button>
                      <button onClick={() => this.deleteGallery(index)}>
                        <icon-trash></icon-trash>
                      </button>
                    </div>
                  </div>
                  <div class="gallery-content">
                    <image-grid images={gallery.images} viewonly={this.viewonly} onImageDelete={(e) => this.deleteImage(index, e.detail)}></image-grid>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Host>
    );
  }

}
