import { Component, Host, h, State, Prop } from '@stencil/core';


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
  gallery: Gallery[];


  @State()
  newGalleryName: string = '';

  private handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newGalleryName = target.value;
  }

  private addGallery() {
    const name = this.newGalleryName.trim();
    if (!name) return;
    this.gallery = [...this.gallery, { name, images: [] }];
    this.newGalleryName = '';
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addGallery();
    }
  }

  private uploadImages(galleryIndex: number) {
    console.log(`Upload clicked for gallery: ${this.gallery[galleryIndex].name}`);
  }

  private deleteImage(galleryIndex: number, imageIndex: number) {
    this.gallery[galleryIndex].images = this.gallery[galleryIndex].images.filter((_, i) => i !== imageIndex);
    this.gallery = [...this.gallery];
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
            {this.gallery.length === 0 ? (
              <p class="empty-message">No galleries yet.</p>
            ) : (
              this.gallery.map((gallery, index) => (
                <div class="gallery-item">
                  <div class="gallery-header">
                    <h3>{gallery.name}</h3>
                    <button onClick={() => this.uploadImages(index)}>
                      <icon-add-image></icon-add-image>
                    </button>
                  </div>
                  {gallery.images.length === 0 ? (
                    <p class="no-images">No images yet.</p>
                  ) : (
                    <div class="image-list">
                      {gallery.images.map((img, imageIndex) => (
                        <div class="image-list__item">
                          <img src={img} alt="Gallery image" />
                          <button class="button-rounded" onClick={() => this.deleteImage(index, imageIndex)}><icon-close></icon-close></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </Host>
    );
  }

}
