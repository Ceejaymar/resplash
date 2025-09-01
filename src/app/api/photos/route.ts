import { getPhotos } from "@/lib/unsplash";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || "1");

  try {
    const { data } = await getPhotos(page, 30);
    return Response.json(data);
  } catch (e: any) {
    const status = e?.status ?? 500;

    console.error("Unsplash error", status, e?.message, e?.rate);
    return Response.json(
      { error: e?.message ?? "Unsplash failed", status, rate: e?.rate },
      { status }
    );
  }
}
