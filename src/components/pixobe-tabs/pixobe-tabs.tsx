import { Component, Host, h, State, Prop, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'pixobe-tabs',
  styleUrl: 'pixobe-tabs.scss',
  shadow: true,
})
export class PixobeTabs {
  @Prop()
  tabs: string[] = [];

  @State()
  activeIndex: number = 0;

  private selectTab(index: number) {
    this.activeIndex = index;
  }

  render() {
    const activeSlotIndex = this.activeIndex || 0;
    return (
      <div class="tabs-container">
        <div class="tab-headers">
          {this.tabs.map((tab, index) => (
            <button
              class={{ active: this.activeIndex === index }}
              onClick={() => this.selectTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div class="tab-content">
          <slot name={`tab-${activeSlotIndex}`}></slot>
        </div>
      </div>
    );
  }

}
