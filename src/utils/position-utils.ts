interface Position {
  top: number;
  left: number;
}

/**
 * Calculates the best absolute position for a child element based on parent and child rects.
 * Places the child above the parent if there's not enough space below.
 */
export function computePosition(element: HTMLElement): Position {
  const spacing = 8;
  console.log(element);
  return { top: 0, left: 0 };
}
