import type { Meta, StoryObj } from '@storybook/html-vite';

const data = {
    "preview": true,
    "stroke": "#000000",
    "coloricker": "#cacaca,#aa00ee,#00ff00,#0000ff"
};

const fonts = [
    {
        "name": "Arial",
        url: ''
    },
    {
        "name": "Roboto",
        "url": "https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBHMdazQ.woff2"
    }
]

function createForm(data: any) {
    return `
    <html-form data='${JSON.stringify(data)}'>
        <web-wrapper class="flex">
            <check-box label="Preview" name="preview" value="true"></check-box>
            <color-input label="Text Color" name="stroke"></color-input>
            <color-swatch label="Color Picker" name="coloricker" editable="false"></color-swatch>
            <input-text name="firstName" placeholder="First Name" label="First Name"></input-text>
            <font-picker name="textFont" placeholder="Fonts" label="Fonts" fonts=${fonts}></font-picker>
            <button>Submit</button>
        </web-wrapper>
    </html-form>`
}


const meta: Meta<any> = {
    title: 'HtmlForm',
    render: (args) => createForm(args.data),
    argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const NoValue: Story = {
    args: {
    },
};

export const WithData: Story = {
    args: {
        data
    },
};
