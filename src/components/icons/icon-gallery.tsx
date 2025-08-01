import { Component, h, Host } from '@stencil/core';

@Component({
    styleUrl: 'icon-styles.scss',
    tag: 'icon-gallery',
})
export class IconImageGallery {
    render() {
        return (
            <Host class="icon">
                <svg fill="none" viewBox="0 0 24 24" width="100%" height="100%">
                    <path fill="currentColor" d="M8.625 14.575H18.4l-3.175 -4.275 -2.575 3.375L10.95 11.5l-2.325 3.075ZM6.5 19c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V3.5c0 -0.4 0.15 -0.75 0.45 -1.05 0.3 -0.3 0.65 -0.45 1.05 -0.45h14c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v14c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H6.5Zm-3 3c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V5h1.5v15.5h15.5v1.5H3.5Z" stroke-width="0.5"></path>
                </svg>
            </Host>
        );
    }
}
