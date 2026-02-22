export default function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(src);

  // Unsplash specific params:
  // 'w' for width, 'q' for quality, 'auto=format' for WebP/AVIF support
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", (quality || 75).toString());

  return url.href;
}
