import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeTabsElement } from './pixobe-tabs';

const meta = {
    title: 'PixobeTabsElement',
    component: PixobeTabsElement,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
} satisfies Meta<PixobeTabsElement>;

export default meta;
type Story = StoryObj<PixobeTabsElement>;

export const Basic: Story = {
    args: {
    },
    render: (props) => {
        return <p-tabs {...props} />;
    }
};
