import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
    title: 'Dialog',
    render: (args) => {
        const el = document.createElement("pixobe-dialog");
        Object.assign(el, args);

        // Add slot content
        const content = document.createElement("div");
        content.textContent = args.slotContent || "Default slot content";
        el.appendChild(content);

        return el;
    },
    argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Primary: Story = {
    args: {
    },
};
