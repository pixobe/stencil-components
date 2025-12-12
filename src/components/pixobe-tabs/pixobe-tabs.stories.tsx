import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
    title: 'Pixobe Tabs',
    render: () => {
        const el = document.createElement("pixobe-tabs");

        el.innerHTML = `
          
  <div slot="tab-0">Home content here</div>
  <div slot="tab-1">Profile details</div>
  <div slot="tab-2">Settings form</div>
        `;

        // el.tabs = ["Home", "Profile", "Settings"]
        return el;
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<any>;

export const Primary: Story = {
    args: {},
};

