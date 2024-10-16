import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-alignleft',
})
export class IconAlignLeft {
    render() {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM5 17C5 16.4477 5.44772 16 6 16H11C11.5523 16 12 16.4477 12 17C12 17.5523 11.5523 18 11 18H6C5.44772 18 5 17.5523 5 17Z" fill="currentColor"></path>
            </svg>
        );
    }
}
