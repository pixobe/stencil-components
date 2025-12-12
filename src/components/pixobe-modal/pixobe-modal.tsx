import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';

@Component({
  tag: 'p-modal',
  styleUrl: 'pixobe-modal.scss',
})
export class PixobeModalElement {
  @Element()
  el: HTMLElement;

  @Prop({ reflect: true, mutable: true })
  open: boolean = false;

  @Prop({ reflect: true })
  closeButton: boolean = false;

  @Watch('open')
  watchOpen(newValue: boolean) {
    document.body.style.overflow = newValue === true ? 'hidden' : '';
  }

  componentDidLoad() {
    document.addEventListener("keyup", (event) => {
      if (event.key === 'Escape') {
        this.closeDialog(event);
      }
    })
  }

  closeDialog(event: Event) {
    event.preventDefault();
    if (this.open) {
      this.open = false;
      document.body.style.overflow = '';
    }
  }

  render() {
    return (
      <Host>
        <div class="dialog" data-open={this.open}>
          <div class="content">
            <slot></slot>
          </div>
          {this.closeButton &&
            <button
              class="button-rounded button-close"
              onClick={(e) => this.closeDialog(e)}
            >
              <icon-close></icon-close>
            </button>}
        </div>
      </Host>
    );
  }
}
