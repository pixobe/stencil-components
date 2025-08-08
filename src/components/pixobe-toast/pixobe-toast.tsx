import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'pixobe-toast',
  styleUrl: 'pixobe-toast.scss',
  shadow: true,
})

export class PixobeToast {
  @Element() el: HTMLElement;
  @Prop() message: string;
  @Prop() status: 'success' | 'error' = 'success';
  @Prop() timeout: number = 5;
  @State() isClosing: boolean = false;

  private fadeTimeout: number;

  componentDidLoad() {
    this.fadeTimeout = window.setTimeout(() => {
      this.closeToast();
    }, this.timeout * 1000);
  }

  disconnectedCallback() {
    clearTimeout(this.fadeTimeout);
  }

  closeToast() {
    this.isClosing = true;
    setTimeout(() => {
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
