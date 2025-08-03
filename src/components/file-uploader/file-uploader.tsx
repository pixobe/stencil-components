import { AttachInternals, Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

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

  @Event()
  fileInput: EventEmitter;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  onFileSelect(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const files = (e.target as HTMLInputElement).files || [];
    this.fileInput.emit(files);
  }

  render() {
    return (
      <Host>
        <div class="form-element">
          <label htmlFor={this.name}>
            <icon-add-image></icon-add-image>
            <div>
              <p>{this.label}</p>
            </div>
            <input type="file" name={this.name} id={this.name} onInput={(e) => this.onFileSelect(e)} />
          </label>
        </div>
      </Host>
    );
  }
}
