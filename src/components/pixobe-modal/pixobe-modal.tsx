import { Component, Host, h, Prop, Element, Method, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'p-modal',
  styleUrl: 'pixobe-modal.scss',
  shadow: true
})
export class PixobeModalElement {
  @Element()
  el: HTMLElement;

  private dialogEl?: HTMLDialogElement;

  /**
   * Controls the open/closed state of the modal
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Emitted when the modal is opened
   */
  @Event() modalOpen: EventEmitter<void>;

  /**
   * Emitted when the modal is closed
   */
  @Event() modalClose: EventEmitter<void>;

  /**
   * Emitted when backdrop is clicked (if you want to handle it separately)
   */
  @Event() backdropClick: EventEmitter<void>;

  /**
   * Method to open the modal programmatically
   */
  @Method()
  async openModal() {
    this.open = true;
  }

  /**
   * Method to close the modal programmatically
   */
  @Method()
  async closeModal() {
    this.open = false;
  }

  componentDidLoad() {
    // Handle native dialog close event (like ESC key)
    this.dialogEl?.addEventListener('close', () => {
      this.open = false;
    });
  }

  componentDidUpdate() {
    if (this.open && this.dialogEl && !this.dialogEl.open) {
      this.dialogEl.showModal();
      this.modalOpen.emit();
    } else if (!this.open && this.dialogEl?.open) {
      this.dialogEl.close();
      this.modalClose.emit();
    }
  }

  private handleBackdropClick = (e: MouseEvent) => {
    // Close only if clicking on the backdrop (not the dialog content)
    if (e.target === this.dialogEl) {
      this.backdropClick.emit();
      this.closeModal();
    }
  };

  private handleCloseClick = () => {
    this.closeModal();
  };

  render() {
    return (
      <Host>
        <dialog
          ref={(el) => this.dialogEl = el}
          onClick={this.handleBackdropClick}
        >
          <div class="modal-content">
            <button
              class="close-button"
              onClick={this.handleCloseClick}
              aria-label="Close modal"
            >
              <icon-close></icon-close>
            </button>
            <slot />
          </div>
        </dialog>
      </Host>
    );
  }
}