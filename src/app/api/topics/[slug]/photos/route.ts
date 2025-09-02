import { NextRequest } from "next/server";
import { getTopicPhotos } from "@/lib/topics";

export async function GET(req: NextRequest) {
  const page = Number(new URL(req.url).searchParams.get("page") || 1);
  const slug = req.nextUrl.pathname.split("/")[3];

  try {
    const { data } = await getTopicPhotos(page, 30, slug);
    return Response.json(data);
  } catch (err: unknown) {
    let status = 500;
    if (typeof err === "object" && err !== null && "status" in err) {
      const s = (err as Record<string, unknown>).status;
      if (typeof s === "number") status = s;
    }
    const message = err instanceof Error ? err.message : "Unsplash failed";

    return Response.json({ error: message, status }, { status });
  }
}
