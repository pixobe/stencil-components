import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Swatch',
  render: (args) => {
    const wrapper = document.createElement("div");
    const className = args.className || ''
    wrapper.classList.add("position-wrapper");
    if (className) {
      wrapper.classList.add(className)
    }

    const divWrap = document.createElement("div");
    const el = document.createElement("color-swatch");
    el.label = args.label;
    el.name = args.name;
    el.value = args.value;
    el.editable = args.editable;

    if (args.style)
      el.classList.add(args.style);

    el.addEventListener('colorChange', (e: any) => {
      console.log("color selected:: ", e.detail)
    });
    el.addEventListener('colorInput', (e: any) => {
      console.log("colorChange", e.detail)
    });
    divWrap.appendChild(el)
    wrapper.appendChild(divWrap);
    return wrapper;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Primary: Story = {
  args: {
    label: "Text Color",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Please select the color that fits best on the rendered Product item, and click save once color is selected",
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


export const EditMode: Story = {
  args: {
    label: "Colors",
    editable: true,
    value: "#ff0000,#00ff00,#0000ff"
  },
};

export const Swatches: Story = {
  args: {
    label: "Colors",
    value: "#ff0000,#00ff00,#0000ff"
  },
};

export const BlockStyle: Story = {
  args: {
    label: "Colors",
    value: "#ff0000,#00ff00,#0000ff",
    style: "block-style"
  },
};