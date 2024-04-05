/**
 *
 * @param args
 * @returns
 */
const createElement = (args) => {
    // Create dropdown-menu element
    const icons = document.createElement('div');
    const html = `
      <icon-envelope class="icon"></icon-envelope>
      <icon-pixobe class="icon"></icon-pixobe>
      <icon-facebook class='icon'></icon-facebook>
      <icon-youtube class='icon'></icon-youtube>
      <icon-thickness class='icon'></icon-thickness>
      <icon-move class='icon'></icon-move>
    `;
    icons.innerHTML =html;
    icons.classList.add('icons');
    icons.classList.add(args.theme)
    return icons;
  };
  
  export default {
    title: 'Icons',
    render: ({...args}) => {
      return createElement({...args});
    },
    argTypes: {},
  };
  
  export const Light = {
    args: {},
  };
  
  export const Dark = {
    args: {
        theme:'dark'
    },
  };