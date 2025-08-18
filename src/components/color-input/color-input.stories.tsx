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
    el.label = args.label;
    el.name = args.name;
    el.value = args.value;

    if (args.style)
      el.classList.add(args.style);

    el.addEventListener('colorChange', (e: any) => {
      console.log("colorChange:: ", e.detail)
    });
    el.addEventListener('colorInput', (e: any) => {
      console.log("colorInput::", e.detail)
    });
    wrapper.appendChild(el);
    return wrapper;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Primary: Story = {
  args: {
    label: "Text Color",
    value: '#000fff'
  },
};

export const InputStyle: Story = {
  args: {
    label: "Text Color",
    value: '#000fff'
  },
};

export const FullWidth: Story = {
  args: {
    label: "Please select the color that fits best on the rendered Product item, and click save once color is selected",
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
    value: '#ff00ff',
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


export const EditMode: Story = {
  args: {
    label: "Colors",
    value: '#ff0000',
    editable: true,
    swatches: ['#ff0000', '#ffAA00', '#ff00FF'].join(",")
  },
};

export const Swatches: Story = {
  args: {
    label: "Colors",
    value: '#ff0000',
  },
};

export const BlockStyle: Story = {
  args: {
    label: "Colors",
    value: '#ff0000',
    style: "block-style"
  },
};