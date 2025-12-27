import { Component, Host, h, State, Prop, Event, EventEmitter, AttachInternals } from '@stencil/core';
import { GridImageProp } from '../image-grid/image-grid';
import { PixobeTextFieldElement } from '../text-field/text-field';
import { ensureJsonObject } from '../../utils/json-utils';

declare const wp: any;

interface Gallery {
  name: string;
  images: GridImageProp[];
}


@Component({
  tag: 'p-wpgallery',
  styleUrl: 'wp-gallery.scss',
  shadow: true,
  formAssociated: true
})
export class PixobeImageGalleryElement {

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

  galleryNameRef: PixobeTextFieldElement;

  componentWillLoad() {
    this.value = ensureJsonObject(this.value);
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  componentDidRender() {
    this.internals.setFormValue(JSON.stringify(this.value));
  }

  private onFormSubmit = () => {
    const name = this.galleryNameRef.value?.trim();
    if (!name) return;
    this.value = [{ name, images: [] }, ...this.value];
    this.newGalleryName = '';
    this.internals.setFormValue(JSON.stringify(this.value));
    this.galleryNameRef.value = '';
  }

  private deleteGallery(galleryIndex: number) {
    const newGallery = this.value.filter((_, index) => index !== galleryIndex);
    this.value = [...newGallery];
    this.internals.setFormValue(JSON.stringify(this.value));
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
        const images = attachments.map((attachment: any) => ({ url: attachment.url }));
        gallery.images = [...gallery.images, ...images];
        this.value = [...this.value];
      }
    });
    frame.open();
  }

  render() {
    return (
      <Host class={{ "view-only": this.viewonly }}>
        <div class="gallery">
          <div>
            <form>
              <div class="g-form">
                <div>
                  <p-textfield
                    ref={(el: any) => this.galleryNameRef = el}
                    type="text"
                    name="galleryName"
                    placeholder="Enter gallery name"
                    data-ignore
                  ></p-textfield>
                </div>
                <div>
                  <button class="btn-rounded btn-primary" type="button" onClick={this.onFormSubmit}><icon-add></icon-add></button>
                </div>
              </div>
            </form>
          </div>

          <p-section>
            <div class="gallery-list">
              {this.value?.length === 0 ? (
                <p class="empty-message">No galleries yet.</p>
              ) : (
                this.value?.map((gallery, index) => (
                  <div class="gallery-item" key={index}>
                    <div class="gallery-header">
                      <h3>{gallery.name}</h3>
                      <div class="btn-action">
                        <button onClick={() => this.uploadImages(gallery)}>
                          <icon-add-image></icon-add-image>
                        </button>
                        <button onClick={() => this.deleteGallery(index)}>
                          <icon-trash></icon-trash>
                        </button>
                      </div>
                    </div>
                    <div class="gallery-content">
                      <p-imagegrid images={gallery.images} viewonly={this.viewonly} onImageDelete={(e) => this.deleteImage(index, e.detail)}></p-imagegrid>
                    </div>
                  </div>
                ))
              )}
            </div>
          </p-section>
        </div>
      </Host>
    );
  }

}
