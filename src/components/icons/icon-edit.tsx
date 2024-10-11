import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-edit',
})
export class IconEdit {
    render() {
        return (
            <svg viewBox="0 0 24 24" class="icon" xmlns="http://www.w3.org/2000/svg">
                <g stroke-linecap="round" stroke-linejoin="round"><path id="Vector" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="currentColor"></path></g>
            </svg>
        )
    }
}
