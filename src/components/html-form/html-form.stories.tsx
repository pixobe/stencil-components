import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { HtmlForm } from './html-form'

const meta: Meta<HtmlForm> = {
    title: 'HtmlForm',
    component: HtmlForm,
    argTypes: {},
    args: {},
    render: () => {
        async function onSubmit(e: any) {
            e.preventDefault();
            const parent = e.target.parentElement;
            const formData = await parent.formData();
            console.table(formData);
        }
        const tag = <html-form >
            <check-box label="Preview" name="preview"></check-box>
            <div>
                <input-text label="Name" name="name" value="Hello world"></input-text>
            </div>
            <input-text label="Address Line 1" name="address.line1" value="Block 97"></input-text>
            <input-text label="Address Line 2" name="address.line2" value="Yishun Avenue 1" data-ignore></input-text>
            <input-text name="font[].name" placeholder="Font name"></input-text>
            <input-text name="font[].url" placeholder="Font URL"></input-text>
            <button onClick={onSubmit}>Submit</button>
        </html-form>
        return tag;
    },
};

export default meta;

type Story = StoryObj<HTMLFormElement>;


export const Unchecked: Story = {
    args: {
        label: "Preview"
    },
};
