import { Component, h } from '@stencil/core';

@Component({
    tag: 'icon-circle',
})
export class IconEnvelope {
    render() {
        return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon"><circle cx="12" cy="12" r="12" fill="currentColor"></circle></svg>);
    }
}
