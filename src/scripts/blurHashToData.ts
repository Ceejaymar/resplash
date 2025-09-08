// lib/blurhash.ts
import { decode } from "blurhash";
import { createCanvas } from "canvas"; // works on the server

const FALLBACK_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wIAAgMBAp7NswAAAABJRU5ErkJggg==";

export function blurhashToDataUrl(
  hash?: string | null,
  width = 32,
  height = 32
): string {
  if (!hash) return "";

  const pixels = decode(hash, width, height);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/png");
}
