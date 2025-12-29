import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeFormElement } from './pixobe-form';

const meta = {
  title: 'Form',
  component: PixobeFormElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeFormElement>;

export default meta;
type Story = StoryObj<PixobeFormElement>;

export const Full: Story = {
  args: {},
  render: () => {
    const gallery = [{
      name: "Animals",
      images: [
        { url: "/assets/images/unicorn.jpg" },
        { url: "/assets/images/windmill.jpg" }
      ]
    }, {
      name: "Animals",
      images: [
        { url: "/assets/images/unicorn.jpg" },
        { url: "/assets/images/windmill.jpg" }
      ]
    },]
    const onSubmit = (e) => {
      console.log("FormData::: ", e.detail)
    }
    return <p-form id="myForm" onFormSubmit={onSubmit}>
      <p-textfield type="text" placeholder="First Name" name="firstname" value="Sudharsan" />
      <div>
        <div>
          <p-textfield type="number" placeholder="Age" name="age" />
        </div>
      </div>
      <div>
        <div>
          <p-lineitems name="products">
            <div slot="template" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
              <p-textfield type="text" placeholder="Item name" name="name" data-ignore={true} />
              <p-textfield type="number" placeholder="Quantity" name="quantity" data-ignore={true} />
            </div>
          </p-lineitems>
        </div>
      </div>
      <div>
        <p-wpgallery name="gallery" value={gallery}></p-wpgallery>
      </div>
      <button type="submit">Submit</button>
    </p-form>;
  }
};



export const Minimal: Story = {
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
      <p-switch name="background" label="Background" value='true' />
      <p-textarea name="comments" label="Comments" />
      <p-colorpicker name="swatch" label="Swatch" value="#FF7799" />
      <button>Submit</button>
    </form>;
  }
};
