import { Component, h, Host } from '@stencil/core';

@Component({
    styleUrl: 'icon-styles.scss',
    tag: 'icon-add-image',
})
export class IconAddImage {
    render() {
        return (
            <Host class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="100%" width="100%">
                    <path fill="currentColor" d="M4.5 21c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h10.225v4.275h2.025v2.025H21V19.5c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H4.5Zm1.5 -4.05h12l-3.6 -4.8 -3.175 4.175 -2.35 -3.1L6 16.95Zm11.5 -8.4v-2.025h-2.025v-1.5H17.5V3h1.5v2.025h2.025v1.5H19v2.025h-1.5Z" stroke-width="0.5"></path>
                </svg>
            </Host>
        );
    }
}
