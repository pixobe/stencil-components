import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-add',
})
export class IconAdd {
    render() {
        return (
            <svg viewBox="0 0 24 24" class="icon" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18M12 6V18" fill="currentColor"></path>
            </svg>
        );
    }
}
