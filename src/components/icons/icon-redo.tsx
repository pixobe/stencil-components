import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-redo',
})
export class IconRedo {
    render() {
        return (
            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path d="M21,11a1,1,0,0,0-1,1,8.05,8.05,0,1,1-2.22-5.5h-2.4a1,1,0,0,0,0,2h4.53a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4.77A10,10,0,1,0,22,12,1,1,0,0,0,21,11Z" />
            </svg>
        );
    }
}
