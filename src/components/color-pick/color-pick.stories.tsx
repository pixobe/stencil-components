import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeColorPickerElement } from './color-pick';

const meta = {
    title: 'ColorPick',
    component: PixobeColorPickerElement,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
    // Define common render function at meta level
    render: (props) => {
        const changeFn = (e) => {
            console.log("Color change ", e.detail)
        }
        const inputFn = (e) => {
            console.log("Color input ", e.detail)
        }

        return <p-colorpicker {...props} onColorChange={changeFn} onColorInput={inputFn} />;
    }
} satisfies Meta<PixobeColorPickerElement>;

export default meta;
type Story = StoryObj<PixobeColorPickerElement>;

// Now stories only need to specify their args
export const Basic: Story = {
    args: {},
};

export const WithAlpha: Story = {
    args: {
        alpha: true
    },
};

export const WithValue: Story = {
    args: {
        alpha: true,
        value: "#FF0000"
    },
};

export const WithLabel: Story = {
    args: {
        alpha: true,
        value: "#FF0000",
        label: "Font Color"
    },
};