import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'p-toast',
  styleUrl: 'pixobe-toast.scss',
  shadow: true,
})

export class PixobeToastElement {
  @Element() el: HTMLElement;

  @Prop()
  message: string;

  @Prop()
  status: 'success' | 'error' = 'success';

  @Prop()
  timeout: number = 5;

  @State()
  isClosing: boolean = false;

  private fadeTimeout: any;
  private removeTimeout: any;

  componentDidLoad() {
    this.startTimeout();
  }

  componentWillUpdate() {
    // Reset the closing state and timeout when props update
    this.isClosing = false;
    this.startTimeout();
  }

  startTimeout() {
    // Clear any existing timeout before starting a new one
    if (this.fadeTimeout) {
      clearTimeout(this.fadeTimeout);
    }

    const timeout = this.timeout || 5;
    this.fadeTimeout = setTimeout(() => {
      this.closeToast();
    }, timeout * 1000);
  }

  disconnectedCallback() {
    this.clearTimeouts();
  }

  clearTimeouts() {
    if (this.fadeTimeout) {
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
    }
    if (this.removeTimeout) {
      clearTimeout(this.removeTimeout);
      this.removeTimeout = null;
    }
  }

  closeToast() {
    // Clear the auto-close timeout if closing manually
    this.clearTimeouts();

    this.isClosing = true;

    // Remove element after fade-out animation completes
    this.removeTimeout = setTimeout(() => {
      this.el.remove();
    }, 300);
  }

  render() {
    return (
      <Host class="toast-container">
        <div class={`toast ${this.status} ${this.isClosing ? 'fade-out' : ''}`}>
          {this.status === 'success' ? <icon-tickcircle></icon-tickcircle> : <icon-error></icon-error>}
          <div class="toast-message" innerHTML={this.message}></div>
          <button class="close-button" onClick={() => this.closeToast()}>
            <icon-close></icon-close>
          </button>
        </div>
      </Host>
    );
  }
}