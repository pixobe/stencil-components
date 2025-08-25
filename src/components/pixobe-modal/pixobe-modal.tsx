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
  @Prop({ reflect: true, mutable: true })
  open: boolean = false;

  @Prop({ reflect: true })
  closeButton: boolean = false;

  private dialog!: HTMLDialogElement;

  @Watch('open')
  watchOpen(newValue: boolean) {
    this.dialog.open = newValue === true;
    document.body.style.overflow = newValue === true ? 'hidden' : '';
  }

  componentDidLoad() {
    this.dialog.addEventListener('cancel', (event: Event) => {
      event.preventDefault();
      this.open = false;
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === 'Escape') {
        const modal = this.dialog;
        if (modal && modal.open) {
          this.open = false;
        }
      }
    })
  }

  closeDialog() {
    this.open = false;
  }

  render() {
    return (
      <Host>
        <dialog ref={(el) => this.dialog = el!}>
          <div class="content">
            <slot></slot>
          </div>
          {this.closeButton &&
            <button
              class="button-rounded button-close"
              onClick={() => this.closeDialog()}
            >
              <icon-close></icon-close>
            </button>}
        </dialog>
      </Host>
    );
  }
}
