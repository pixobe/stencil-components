import { AttachInternals, Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'file-uploader',
  styleUrl: 'file-uploader.scss',
  shadow: true,
  formAssociated: true
})
export class FileUploader {

  @Element()
  el!: HTMLElement

  @Prop({ reflect: true })
  name: string = "File";

  @Prop({ reflect: true })
  label?: string;

  @Prop({ mutable: true })
  value: string = ''

  @AttachInternals()
  internals!: ElementInternals;

  /**
   * 
   * @param e 
   */
  onFileInput = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files = (e.target as HTMLInputElement).files || [];
    const event = new CustomEvent('input', {
      detail: { value: files[0] },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.el.dispatchEvent(event);
  }

  render() {
    return (
      <Host>
        <label class="file-uploader" htmlFor={this.name}>
          <icon-imageupload></icon-imageupload>
          <div>
            <p>{this.label}</p>
          </div>
          <input type="file" onInput={this.onFileInput} name={this.name} id={this.name} />
        </label>
      </Host>
    );
  }
}
