import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'p-toast',
  styleUrl: 'pixobe-toast.scss',
  shadow: true,
})
export class PixobeToastElement {
  @Element() el: HTMLElement;

  @Prop() message: string;
  @Prop() status: 'success' | 'error' = 'success';
  @Prop() timeout: number = 5;

  @State() isClosing: boolean = false;

  private fadeTimeout: NodeJS.Timeout;
  private removeTimeout: NodeJS.Timeout;

  componentDidLoad() {
    this.startTimeout();
  }

  disconnectedCallback() {
    this.clearTimeouts();
  }

  private startTimeout() {
    this.clearTimeouts();

    const timeoutMs = (this.timeout || 5) * 1000;
    this.fadeTimeout = setTimeout(() => {
      this.closeToast();
    }, timeoutMs);
  }

  private clearTimeouts() {
    if (this.fadeTimeout) {
      clearTimeout(this.fadeTimeout);
      this.fadeTimeout = null;
    }
    if (this.removeTimeout) {
      clearTimeout(this.removeTimeout);
      this.removeTimeout = null;
    }
  }

  private closeToast = () => {
    this.clearTimeouts();
    this.isClosing = true;

    // Remove element after animation completes (300ms)
    this.removeTimeout = setTimeout(() => {
      this.el.remove();
    }, 300);
  };

  render() {
    return (
      <Host>
        <div class={`toast ${this.status} ${this.isClosing ? 'fade-out' : ''}`}>
          {this.status === 'success' ? (
            <icon-tickcircle></icon-tickcircle>
          ) : (
            <icon-error></icon-error>
          )}
          <div class="toast-message" innerHTML={this.message}></div>
          <button class="close-button" onClick={this.closeToast} aria-label="Close notification">
            <icon-close></icon-close>
          </button>
        </div>
      </Host>
    );
  }
}