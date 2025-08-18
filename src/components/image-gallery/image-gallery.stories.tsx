import type { Meta, StoryObj } from '@storybook/html-vite';

(window as any).wp = {
  media: ({ title, button }: any) => {
    let selectCallback: Function | null = null;

    return {
      on: (eventName: string, callback: Function) => {
        if (eventName === "select") {
          selectCallback = callback;
        }
        return this;
      },

      open: () => {
        console.log("Mock wp.media open called");

        // Create a fake modal
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "rgba(0,0,0,0.6)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = "9999";

        const content = document.createElement("div");
        content.style.background = "#fff";
        content.style.padding = "20px";
        content.style.borderRadius = "8px";
        content.style.textAlign = "center";
        content.style.maxWidth = "400px";

        const heading = document.createElement("h3");
        heading.textContent = title || "Select Image";
        content.appendChild(heading);

        const img = document.createElement("img");
        img.src = "/assets/images/monster-car.jpg";
        img.style.maxWidth = "100%";
        img.style.marginBottom = "15px";
        content.appendChild(img);

        const useBtn = document.createElement("button");
        useBtn.textContent = button?.text || "Use this image";
        useBtn.style.padding = "10px 20px";
        useBtn.style.border = "none";
        useBtn.style.background = "#0073aa";
        useBtn.style.color = "#fff";
        useBtn.style.cursor = "pointer";
        useBtn.style.borderRadius = "4px";

        useBtn.onclick = () => {
          document.body.removeChild(modal);

          if (selectCallback) {
            const attachments = [
              { url: "assets/images/unicorn.jpg" }
            ];

            const fakeFrame = {
              state: () => ({
                get: () => ({
                  toJSON: () => attachments
                })
              })
            };

            selectCallback.call(fakeFrame);
          }
        };

        content.appendChild(useBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
      },

      state: () => ({
        get: () => ({
          toJSON: () => [{ url: "/assets/images/monster-car.jpg" }]
        })
      })
    };
  }
};

const gallery = [
  {
    name: "Animals",
    platform: "wp",
    images: [
      "/assets/images/monster-car.jpg",
      "/assets/images/unicorn.jpg",
      "/assets/images/windmill.jpg"
    ].map(src => ({ src }))
  }
]


const meta: Meta<any> = {
  title: 'Image Gallery',
  render: (args) => {
    const el = document.createElement("image-gallery");
    el.addEventListener("imageSelect", (e: any) => {
      console.log(e.detail);
    });
    Object.assign(el, args);
    return el;
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<any>;


export const Empty: Story = {
  args: {
    value: [

    ]
  },
};



export const NoDelete: Story = {
  args: {
    viewonly: true,
    value: gallery
  },
};

export const Gallery: Story = {
  args: {
    value: gallery
  },
};




