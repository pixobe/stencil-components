import { Component, Host, h, State, Prop, Event, EventEmitter, Watch } from '@stencil/core';

declare const wp: any;

interface Gallery {
  name: string;
  images: string[];
}


@Component({
  tag: 'image-gallery',
  styleUrl: 'image-gallery.scss',
  shadow: true,
})
export class ImageGallery {

  @Prop({ mutable: true })
  value: Gallery[];

  @Prop()
  platform: string = "wp";

  @State()
  newGalleryName: string = '';

  @Event()
  mediaFrameEvent: EventEmitter<{ name: string }>;

  private handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newGalleryName = target.value;
  }

  private addGallery() {
    const name = this.newGalleryName.trim();
    if (!name) return;
    this.value = [...this.value, { name, images: [] }];
    this.newGalleryName = '';
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

  private deleteImage(galleryIndex: number, imageSrc: string) {
    const newGallery = [...this.value];
    newGallery[galleryIndex] = {
      ...newGallery[galleryIndex],
      images: newGallery[galleryIndex].images.filter(img => img !== imageSrc)
    };
    this.value = newGallery;
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
        const images = attachments.map((attachment: any) => attachment.url);
        gallery.images = [...gallery.images, ...images];
        this.value = [...this.value];
      }
    });
    frame.open();
  }

  render() {
    return (
      <Host>
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
            {this.value.length === 0 ? (
              <p class="empty-message">No galleries yet.</p>
            ) : (
              this.value.map((gallery, index) => (
                <div class="gallery-item" key={index}>
                  <div class="gallery-header">
                    <h3>{gallery.name}</h3>
                    <button onClick={() => this.uploadImages(gallery)}>
                      <icon-add-image></icon-add-image>
                    </button>
                  </div>
                  <div class="gallery-content">
                    <image-grid images={gallery.images} onImageDelete={(e) => this.deleteImage(index, e.detail)}></image-grid>
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
