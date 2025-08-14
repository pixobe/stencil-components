import type { Meta, StoryObj } from '@storybook/html-vite';

const data = {
    "preview": true,
    "stroke": "#cacaff"
};

function createForm(data: any) {
    const div = document.createElement("web-wrapper");
    // Create the form element
    const form = document.createElement('html-form');

    // Create the checkbox
    const checkbox = document.createElement('check-box');
    checkbox.setAttribute('label', 'Preview');
    checkbox.setAttribute('name', 'preview');
    checkbox.setAttribute('value', 'true');

    const colorInput = document.createElement('color-input');
    colorInput.setAttribute('label', 'Text Color');
    colorInput.setAttribute('name', 'stroke');
    colorInput.setAttribute('value', '#ff00ff');

    const editableColor = document.createElement('color-input');
    editableColor.setAttribute('label', 'Colors');
    editableColor.setAttribute('name', 'colors');
    editableColor.setAttribute('editable', 'true');

    // Create the input-text for Address Line 1
    // const inputText2 = document.createElement('input-text');
    // inputText2.setAttribute('label', 'Address Line 1');
    // inputText2.setAttribute('name', 'address.line1');

    // // Create the input-text for Address Line 2
    // const inputText3 = document.createElement('input-text');
    // inputText3.setAttribute('label', 'Address Line 2');
    // inputText3.setAttribute('name', 'address.line2');

    // // Create the input-text for Font name
    // const inputText4 = document.createElement('input-text');
    // inputText4.setAttribute('name', 'font[0].name');
    // inputText4.setAttribute('placeholder', 'Font name');

    // // Create the input-text for Font URL
    // const inputText5 = document.createElement('input-text');
    // inputText5.setAttribute('name', 'font[0].url');
    // inputText5.setAttribute('placeholder', 'Font URL');

    // // Create the input-text for Gallery name
    // const inputText6 = document.createElement('input-text');
    // inputText6.setAttribute('name', 'gallery[0].name');
    // inputText6.setAttribute('placeholder', 'Font name');

    // // Create the input-text for Gallery image URL
    // const inputText7 = document.createElement('input-text');
    // inputText7.setAttribute('name', 'gallery[0].images[0].src');
    // inputText7.setAttribute('placeholder', 'Font URL');

    // // Create the input-text for Gallery name
    // const inputText8 = document.createElement('input-text');
    // inputText8.setAttribute('name', 'gallery[1].name');
    // inputText8.setAttribute('placeholder', 'Font name');

    // // Create the input-text for Gallery image URL
    // const inputText9 = document.createElement('input-text');
    // inputText9.setAttribute('name', 'gallery[1].images[0].src');
    // inputText9.setAttribute('placeholder', 'Font URL');

    // // Create the input-text for Gallery image URL
    // const inputText10 = document.createElement('input-text');
    // inputText10.setAttribute('name', 'gallery[1].images[1].src');
    // inputText10.setAttribute('placeholder', 'Font URL');

    const button = document.createElement('button');
    button.innerText = "Submit";
    button.addEventListener("click", async () => {
        const data = await form.formData();
        console.log(data);
    })

    // Append all elements to the desired container
    form.appendChild(checkbox);



    // form.appendChild(inputText2);
    // form.appendChild(inputText3);
    // form.appendChild(inputText4);
    // form.appendChild(inputText5);
    // form.appendChild(inputText6);
    // form.appendChild(inputText7);
    // form.appendChild(inputText8);
    // form.appendChild(inputText9);
    // form.appendChild(inputText10);
    form.appendChild(colorInput);
    form.appendChild(editableColor);
    form.appendChild(button);
    div.appendChild(form);
    form.data = data;

    // Append the form to the desired element (e.g., document.body or a specific container)
    return div;
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
