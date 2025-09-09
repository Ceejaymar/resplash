import { NextResponse } from "next/server";

const api = "https://api.unsplash.com";
const key = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const photoId = searchParams.get("photoId");
  const filename = searchParams.get("filename") || "unsplash.jpg";

  if (!url || !photoId) {
    return NextResponse.json(
      { error: "Missing url or photoId" },
      { status: 400 }
    );
  }

  await fetch(`${api}/photos/${photoId}/download`, {
    headers: { authorization: `Client-ID ${key}` },
  });

  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: res.status }
    );
  }

  const blob = await res.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        res.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
