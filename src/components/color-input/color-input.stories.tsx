import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Input',
  render: (args) => {
    const wrapper = document.createElement("div");
    const className = args.className || ''
    wrapper.classList.add("position-wrapper");
    if (className) {
      wrapper.classList.add(className)
    }
    const el = document.createElement("color-input");
    el.value = args.value;
    el.label = args.label;
    el.appearance = args.appearance;

    el.addEventListener('colorChange', (e: any) => {
      console.log("color selected:: ", e.detail)
    });
    el.addEventListener('colorInput', (e: any) => {
      console.log("colorChange", e.detail)
    });

    wrapper.appendChild(el);
    return wrapper;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Blue: Story = {
  args: {
    label: "Text Color",
    value: '#000fff'
  },
};

export const FullWidth: Story = {
  args: {
    label: "Text Color",
    value: '#ff0000',
    appearance: 'input'
  },
};

export const NoValue: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'top-right'
  },
};


export const BottomLeft: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'bottom-left'
  },
};

export const BottomRight: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'bottom-right'
  },
};

export const Center: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'center-middle'
  },
};