import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeModalElement } from './pixobe-modal';

const meta = {
    title: 'Dialog',
    component: PixobeModalElement,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
    // Define common render function at meta level
    render: () => {

        let dialog;
        // Open on button click
        // btn.addEventListener('click', () => {
        //     dialog.open = true;
        // });

        // // Listen to close event
        // dialog.addEventListener('modalClose', () => {
        //     console.log('Modal closed!');
        // });

        const open = () => {
            dialog.open = true;
        }

        return <div>
            <button id="openBtn" onClick={open}>Open Modal</button>
            <p-modal id="myModal" open={false} ref={(el) => dialog = el}>
                <h2>Modal Content</h2>
                <p>Your content here</p>
            </p-modal>
        </div>;
    }
} satisfies Meta<PixobeModalElement>;

export default meta;
type Story = StoryObj<PixobeModalElement>;

// Now stories only need to specify their args
export const Basic: Story = {
    args: {},
};

export const WithAlpha: Story = {
    args: {
    },
};
