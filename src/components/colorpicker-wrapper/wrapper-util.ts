type Position = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  position?: string;
  transform?: string;
};

export function getPosition(): Position | undefined {
  return { bottom: '0', right: '0' };
}
