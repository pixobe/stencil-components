import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'pixobe-dialog',
  styleUrl: 'pixobe-dialog.scss',
  shadow: true,
})
export class PixobeDialog {
  @Element() hostEl: HTMLElement;
  private dialogEl: HTMLDialogElement;

  @Prop() modal: boolean = true;

  @Method()
  async open() {
    this.dialogEl.showModal();
  }

  @Method()
  async close() {
    this.dialogEl.close();
  }

  render() {
    return (
      <dialog ref={el => (this.dialogEl = el as HTMLDialogElement)}>
        <slot />
      </dialog>
    );
  }
}
