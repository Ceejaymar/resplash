import { getPhotos } from "@/lib/unsplash";

export async function GET(req: Request) {
  const page = Number(new URL(req.url).searchParams.get("page") || 1);

  try {
    const { data } = await getPhotos(page, 30);

    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e?.message ?? "Unsplash failed" },
      { status: e?.status ?? 500 }
    );
  }
}
