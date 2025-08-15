import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';

@Component({
  tag: 'pixobe-modal',
  styleUrl: 'pixobe-modal.scss',
  shadow: true,
})
export class PixobeModal {
  @Element()
  el: HTMLElement;

  /** Control whether the modal is open */
  @Prop({ reflect: true })
  open: boolean = false;

  @Prop({ reflect: true })
  closeButton: boolean = false;

  private dialog!: HTMLDialogElement;

  @Watch('open')
  watchOpen(newValue: boolean) {
    if (newValue) {
      this.dialog.showModal();
    } else {
      this.dialog.close();
    }
  }

  componentDidLoad() {
    this.dialog = this.el.shadowRoot!.querySelector('dialog')!;
    if (this.open) {
      this.dialog.showModal();
    }
    this.dialog.addEventListener('cancel', (event: Event) => {
      event.preventDefault();
      this.open = false;
    });
  }

  render() {
    return (
      <Host>
        <dialog>
          <slot></slot>
          <button
            class="button-rounded button-close"
            onClick={() => {
              this.open = false;
            }}
          >
            <icon-close></icon-close>
          </button>
        </dialog>
      </Host>
    );
  }
}
