/**
 *
 */
export default {
  title: 'Spinner',
  render: ({ ...args }) => {
    const spinner = document.createElement('pixobe-spinner');
    if (args.size) {
      spinner.classList.add(args.size);
    }
    return spinner;
  },
  argTypes: {},
};

export const Default = {
  args: {
    size: 'default',
  },
};
