/**
 *
 * @param args
 * @returns
 */
const createElement = args => {
  // Create dropdown-menu element
  const dropdownMenu = document.createElement('div') as HTMLDivElement;
  // Create content to be distributed to the slot
  dropdownMenu.innerHTML = `<dropdown-menu>${args.icon}</dropdown-menu>`;
  const menu = dropdownMenu.querySelector('dropdown-menu');
  menu.options = args.options;
  menu.value = args.value;
  menu.tooltip = args.tooltip;
  return dropdownMenu;
};

export default {
  title: 'Pixobe/DropdownMenu',
  render: ({ ...args }) => {
    return createElement({ ...args });
  },
  argTypes: {
    textColor: { control: 'color' },
  },
};

export const WithIcon = {
  args: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="100%" width="100%">
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
    </svg>`,
    options: createBrighteness(),
    value: 3,
    tooltip: "Brightness"
  },
};


function createBrighteness(){
    const options=[];
    for(let i=0;i<=100;i++){
       options.push(i)
    }
    return options;
}