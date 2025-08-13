import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'MenuIcon',
  render: (args) => {
    const el = document.createElement("menu-icon");
    Object.assign(el, args);

    const thicknessList = [1, 2, 3, 4, 5];


    el.innerHTML = `
    
              <div class="icon" slot="menu-icon">
                <IconLineThickness></IconLineThickness>
              </div>
              <div slot="menu-items">
              </div>
              <div class="menu-label" slot="menu-text">
                <div class="icon">
                  <ThickLine thickness={this.strokeWidth / 5}></ThickLine>
                </div>
              </div>
    
    `;
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const NoValue: Story = {
  args: {
    label: "Colors",
    value: '',
    name: "colors"
  },
};

export const Default: Story = {
  args: {
    label: "Colors",
    value: '',
    name: "colors",
    options: [
      {
        label: "Monday",
        value: "Monday"
      },
      {
        label: "Tuesday",
        value: "Tuesday"
      },
      {
        label: "Wednesday",
        value: "Wednesday"
      },
      {
        label: "Thursday",
        value: "Thursday"
      },
      {
        label: "Friday",
        value: "Friday"
      },
      {
        label: "Saturday",
        value: "Saturday"
      },
      {
        label: "Sunday",
        value: "Sunday"
      }
    ]
  },
};

