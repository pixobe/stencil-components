import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

const icons = ['envelope',
    'pixobe',
    'help',
    'monogram',
    'alignleft',
    'aligncenter',
    'alignright',
    'circle',
    'image',
    'imageupload',
    'text',
    'close',
    'info',
    'upload',
    'add',
    'edit',
    'fliph',
    'flipv',
    'cart',
    'rotate',
    'support',
    'whatsapp',
    'facebook',
    'instagram',
    'wrench',
    'add-cart',
    'done',
    'redo',
    'arrow',
    'magic',
    'pdf',
    'preview',
    'trash',]

const meta: Meta<HTMLDivElement> = {
    title: 'Icons',
    component: HTMLDivElement,
    argTypes: {
    },
};




export default meta;

type Story = StoryObj<HTMLDivElement>;

export const DarkTheme: Story = {
    render: () => <div class="dark">
        {icons.map(icon => {
            const T = `icon-${icon}`;
            return <T></T>
        })}
    </div>,
};


export const LightTheme: Story = {
    render: () => <div class="light">
        {icons.map(icon => {
            const T = `icon-${icon}`;
            return <T></T>
        })}
    </div>,
};

export const ColorTheme: Story = {
    render: () => <div class="color">
        {icons.map(icon => {
            const T = `icon-${icon}`;
            return <T></T>
        })}
    </div>,
};
