import { getTopicPhotos } from "@/lib/topics";

export async function GET(req, ctx) {
  const page = Number(new URL(req.url).searchParams.get("page") || 1);

  try {
    const { data } = await getTopicPhotos(page, 30, ctx.params.slug);
    return Response.json(data);
  } catch (e) {
    return Response.json(
      { error: e?.message ?? "Unsplash failed" },
      { status: e?.status ?? 500 }
    );
  }
}
