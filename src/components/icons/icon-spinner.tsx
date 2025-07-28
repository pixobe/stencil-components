import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'icon-spinner',
    styleUrls: ['icon-styles.scss', 'icon-spinner.scss'],
})
export class IconSpinner {
    render() {
        return (
            <Host class="icon">
                <div class="spinner"></div>
            </Host>
        );
    }
}
