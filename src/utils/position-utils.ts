export interface TPosition {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

/**
 * Computes position for an absolutely positioned child element relative to a parent.
 * If there's not enough space below, places the child above with `bottom: 100%`.
 * Otherwise places the child below with `top: 100%`.
 */
export function computePosition(parent: HTMLElement): TPosition {
  const options = { childWidth: 200, childHeight: 264, spacing: 2 };

  const rect = parent.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const spaceBelow = viewportHeight - (rect.bottom + options.spacing);
  const spaceAbove = rect.top - options.spacing;

  // Vertical positioning
  let top: string = 'auto';
  let bottom: string = 'auto';
  if (spaceBelow >= options.childHeight) {
    top = `calc(100% + ${options.spacing}px)`; // below parent
  } else if (spaceAbove >= options.childHeight) {
    bottom = `calc(100% + ${options.spacing}px)`; // above parent
  } else {
    // center relative to parent if not enough space
    top = `${Math.max((rect.height - options.childHeight) / 2, 0)}px`;
  }

  // Horizontal positioning
  let left: string = '0';
  let right: string = 'auto';
  const spaceRight = viewportWidth - (rect.left + options.childWidth + options.spacing);
  if (spaceRight < 0) {
    // not enough space on the right → flip to right edge
    left = 'auto';
    right = '0';
  }

  return { top, bottom, left, right };
}
