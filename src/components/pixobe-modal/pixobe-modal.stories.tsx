import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
    title: 'Modal',
    render: (args) => {
        // Create the modal element
        const el = document.createElement("pixobe-modal");
        Object.assign(el, args);

        // Add slot content
        const content = document.createElement("div");
        content.style.padding = "1rem";
        content.textContent = args.slotContent || "Default slot content";
        el.appendChild(content);

        // Create a button to toggle open/close
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Modal";
        toggleBtn.style.marginBottom = "1rem";

        toggleBtn.addEventListener("click", () => {
            console.log(el.open, "current state")
            el.open = !el.open;
        });

        // Wrap everything in a container
        const container = document.createElement("div");
        container.classList.add("hero")
        container.appendChild(toggleBtn);
        container.appendChild(el);

        return container;
    },
    argTypes: {
        open: {
            options: ['true', 'false'],
            control: { type: 'radio' },
        },
    },
};
export default meta;
type Story = StoryObj<any>;


export const Primary: Story = {
    args: {
        open: 'false'
    },
};

export const WithCloseButton: Story = {
    args: {
        open: 'false',
        closeButton: true
    },
};
