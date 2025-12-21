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

export const Basic: Story = {
  args: {
  },
  render: () => {

    const onSubmit = (e) => {
      console.log("FormData::: ", e.detail)
    }
    return <p-form id="myForm" onFormSubmit={onSubmit}>
      <p-textfield type="text" placeholder="First Name" name="firstname" />
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
      <button type="submit">Submit</button>
    </p-form>;
  }
};
