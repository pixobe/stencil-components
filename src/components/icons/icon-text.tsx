import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-text',
})
export class IconText {
    render() {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><g> <path d="M12 3V21M9 21H15M19 6V3H5V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        );
    }
}
