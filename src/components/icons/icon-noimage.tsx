import { Component, h, Host } from '@stencil/core';

@Component({
    styleUrl: 'icon-styles.scss',
    tag: 'icon-noimage',
    shadow: true
})
export class IconNoImage {
    render() {
        return (
            <Host>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="100%" height="100%">
                    <path fill="currentColor" d="M21 18.1748 5.825 2.999805H19.5c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05V18.1748Zm-0.85 4.425 -1.6 -1.6H4.49999c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05v-14.05l-1.575 -1.574995 1.075 -1.075L21.225 21.5248l-1.075 1.075Zm-14.25 -5.525h8.75l-2.25 -2.25 -1.25 1.625 -2.325 -3.175 -2.925 3.8Z" stroke-width="0.5"></path>
                </svg>
            </Host>
        );
    }
}
