import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta = {
    title: 'HTML Form',
    component: HTMLFormElement,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
    },
    args: {},
} satisfies Meta<HTMLFormElement>;

export default meta;
type Story = StoryObj<HTMLFormElement>;

export const Basic: Story = {
    args: {},
    render: () => {
        const submitted = (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const result = {};
            for (const [k, v] of fd.entries()) result[k] = v;
            console.log("Data submitted", result)
        }

        return <form onSubmit={submitted}>
            <p-checkbox name="agree" label="Agree" value="true" />
            <p-textfield name="firstname" label="First Name" value='Sudharsan' />
            <p-textarea name="comments" label="Comments" />
            <p-colorpicker name="swatch" label="Swatch" value="#FF7799" />
            <button>Submit</button>
        </form>;
    }
};
