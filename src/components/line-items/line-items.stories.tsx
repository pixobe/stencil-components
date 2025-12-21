import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeLineItemsElement } from './line-items';

const meta = {
  title: 'Line Items',
  component: PixobeLineItemsElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeLineItemsElement>;

export default meta;
type Story = StoryObj<PixobeLineItemsElement>;

export const Basic: Story = {
  args: {
  },
  render: (props) => {
    const onSubmit = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target;
      const items = target.querySelector('[name="products"]');
      console.log(items.value)
    }

    return <form onSubmit={onSubmit}>
      <p-lineitems {...props} name="products">
        <div slot="template" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          <p-textfield type="text" placeholder="Item name" name="name" />
          <p-textfield type="number" placeholder="Quantity" name="quantity" />
        </div>
      </p-lineitems>
      <button>Submit</button>
    </form>;
  }
};
