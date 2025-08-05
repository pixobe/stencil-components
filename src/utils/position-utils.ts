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
  const options = { childWidth: 200, childHeight: 250, spacing: 4 };

  const rect = parent.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const spaceBelow = viewportHeight - (rect.bottom + options.spacing);
  const spaceAbove = rect.top - options.spacing;

  const verticalPosition: Record<string, string> = {};
  if (spaceBelow >= options.childHeight) {
    verticalPosition.top = '100%';
  } else if (spaceAbove >= options.childHeight) {
    verticalPosition.bottom = '100%';
  } else {
    verticalPosition.top = `${(rect.height - options.childHeight) / 2}px`;
  }

  const spaceRight = viewportWidth - (rect.right + options.spacing);
  const spaceLeft = rect.left - options.spacing;

  if (spaceLeft >= options.childWidth) {
    verticalPosition.right = '0';
  } else if (spaceRight >= options.childWidth) {
    verticalPosition.left = '0';
  } else {
    verticalPosition.left = `${(rect.width - options.childWidth) / 2}px`;
  }

  return {
    top: verticalPosition.top || 'auto',
    bottom: verticalPosition.bottom || 'auto',
    left: verticalPosition.left || 'auto',
    right: verticalPosition.right || 'auto',
  };
}
