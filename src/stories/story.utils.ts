export function wrapSmall(el) {
  const container = document.createElement('div');
  container.classList.add('width-sm');
  container.append(el);
  return container;
}
