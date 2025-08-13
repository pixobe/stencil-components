import { Component, h, Host } from '@stencil/core';

@Component({
  styleUrl: 'icon-styles.scss',
  tag: 'icon-done',
})
export class IconDone {
  render() {
    return (
      <Host class="icon">
        <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.025 21H6.35V8.2L13.3 1l0.825 0.65c0.18335 0.133335 0.30415 0.283335 0.3625 0.45 0.05835 0.166665 0.0875 0.358335 0.0875 0.575v0.25L13.45 8.2H21.5c0.38335 0 0.72915 0.15415 1.0375 0.4625 0.30835 0.30835 0.4625 0.65415 0.4625 1.0375v2.05c0 0.18335 -0.02085 0.39585 -0.0625 0.6375 -0.04165 0.24165 -0.10415 0.45415 -0.1875 0.6375l-2.9 6.7c-0.15 0.35 -0.39585 0.65 -0.7375 0.9 -0.34165 0.25 -0.70415 0.375 -1.0875 0.375ZM4.85 8.2V21H2V8.2h2.85Z" stroke-width="0.5"></path>
        </svg>
      </Host>
    );
  }
}
