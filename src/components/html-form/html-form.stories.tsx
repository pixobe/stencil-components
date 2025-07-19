import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { HtmlForm } from './html-form'

const meta: Meta<HtmlForm> = {
    title: 'HtmlForm',
    component: HtmlForm,
    argTypes: {},
    args: {},
    render: (props) => {
        const data = props.data;
        async function onSubmit(e: any) {
            e.preventDefault();
            const parent = e.target.parentElement;
            const formData = await parent.formData();
            console.table(formData);
        }
        const tag = <html-form data={data}>
            <check-box label="Preview" name="preview"></check-box>
            <div>
                <input-text label="Name" name="firstname"></input-text>
            </div>
            <input-text label="Address Line 1" name="address.line1"></input-text>
            <input-text label="Address Line 2" name="address.line2" ></input-text>
            <input-text name="font[0].name" placeholder="Font name" ></input-text>
            <input-text name="font[0].url" placeholder="Font URL" ></input-text>
            <input-text name="gallery[0].name" placeholder="Font name" ></input-text>
            <input-text name="gallery[0].images[0].src" placeholder="Font URL" ></input-text>
            <input-text name="gallery[1].name" placeholder="Font name" ></input-text>
            <input-text name="gallery[1].images[0].src" placeholder="Font URL" ></input-text>
            <input-text name="gallery[1].images[1].src" placeholder="Font URL"></input-text>
            <button onClick={onSubmit}>Submit</button>
        </html-form>
        return tag;
    },
};

export default meta;

type Story = StoryObj<HTMLFormElement>;


export const Unchecked: Story = {
    args: {
        data: {
            "preview": true,
            "firstname": "Test",
            "address": {
                "line1": "Block 98",
                "line2": "Yishun Avenue 1"
            },
            "font": [
                {
                    "name": "Roboto",
                    "url": "https://roboto.com.sg"
                }
            ],
            "gallery": [
                {
                    "name": "Seasons",
                    "images": [
                        {
                            "src": "https://seasons.com.sg"
                        }
                    ]
                },
                {
                    "name": "Animals",
                    "images": [
                        {
                            "src": "https://animals.com.sg"
                        },
                        {
                            "src": "https://animals2.com.sg"
                        }
                    ]
                }
            ]
        }
    },
};
