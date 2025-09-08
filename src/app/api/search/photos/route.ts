// /app/api/search/photos/route.ts
import { NextRequest } from "next/server";
import { searchPhotos } from "@/lib/unsplash";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") || 1);
  const q = req.nextUrl.searchParams.get("q") ?? "";

  try {
    const { data } = await searchPhotos(page, 30, q);
    return Response.json({ data });
  } catch (err: any) {
    const status = typeof err?.status === "number" ? err.status : 500;
    const message =
      err instanceof Error && err.message ? err.message : "Unsplash failed";

    return Response.json({ error: message, status }, { status });
  }
}
