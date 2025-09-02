/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPhotos } from "@/lib/unsplash";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");

  try {
    const { data } = await getPhotos(page, 30);
    return Response.json(data);
  } catch (err: any) {
    const status = typeof err?.status === "number" ? err.status : 500;
    const message =
      err instanceof Error && err.message ? err.message : "Unsplash failed";
    const rate = (err && (err as any).rate) || undefined;

    return Response.json({ error: message, status, rate }, { status });
  }
}
