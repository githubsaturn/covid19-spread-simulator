export const SIZE_CHANGED = "SIZE_CHANGED";

export function emitSizeChanged() {
  return {
    type: SIZE_CHANGED,
    payload: {}
  };
}
