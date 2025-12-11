import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'icon-spinner',
    styleUrls: ['icon-styles.scss', 'icon-spinner.scss'],
    shadow: true
})
export class IconSpinner {
    render() {
        return (
            <Host>
                <span class="spinner" role="status" aria-label="Loading"></span>
            </Host>
        );
    }
}
