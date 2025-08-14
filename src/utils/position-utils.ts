export interface TPosition {
  top: string;
  bottom: string;
  left: string;
  right: string;
}

interface ComputePositionOptions {
  childWidth?: number;
  childHeight?: number;
  spacing?: number;
}

/**
 * Computes position for an absolutely positioned child element relative to a parent.
 * If there's not enough space below, places the child above with `bottom: 100%`.
 * Otherwise places the child below with `top: 100%`.
 */
export function computePosition(parent: HTMLElement): TPosition {
  const options = { childWidth: 200, childHeight: 250, spacing: 2 };

  const rect = parent.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const spaceBelow = viewportHeight - (rect.bottom + options.spacing);
  const spaceAbove = rect.top - options.spacing;

  const offset = `calc(100% + ${options.spacing}px)`;

  const verticalPosition: Record<string, string> = {};
  if (spaceBelow >= options.childHeight) {
    verticalPosition.top = offset;
  } else if (spaceAbove >= options.childHeight) {
    verticalPosition.bottom = offset;
  } else {
    verticalPosition.top = `${(rect.height - options.childHeight) / 2}px`;
  }

  const spaceRight = viewportWidth - (rect.right + options.spacing);

  if (spaceRight >= options.childWidth) {
    // enough space on the right → default position
    verticalPosition.left = '0';
    verticalPosition.right = 'auto';
  } else {
    // not enough space → align to right
    verticalPosition.left = 'auto';
    verticalPosition.right = '0';
  }
  return {
    top: verticalPosition.top || 'auto',
    bottom: verticalPosition.bottom || 'auto',
    left: verticalPosition.left || 'auto',
    right: verticalPosition.right || 'auto',
  };
}
