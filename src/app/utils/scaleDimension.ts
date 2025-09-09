export function scaledDimensions(
  origWidth: number,
  origHeight: number,
  targetWidth: number | null
) {
  if (!targetWidth || origWidth <= targetWidth) {
    return { width: origWidth, height: origHeight };
  }
  const ratio = targetWidth / origWidth;
  return {
    width: targetWidth,
    height: Math.round(origHeight * ratio),
  };
}
