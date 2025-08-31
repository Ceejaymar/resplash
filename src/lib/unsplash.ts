import "server-only";

const api = "https://api.unsplash.com";
const key = process.env.UNSPLASH_ACCESS_KEY;

export async function getPhotos(page = 1, perPage = 30) {
  const res = await fetch(`${api}/photos?page=${page}&per_page=${perPage}`, {
    headers: { authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    next: { revalidate: 3600 },
  });

  const rate = {
    limit: res.headers.get("X-Ratelimit-Limit"),
    remaining: res.headers.get("X-Ratelimit-Remaining"),
  };

  if (!res.ok) {
    return Response.json(
      { error: "Unsplash error", status: res.status, rate },
      { status: res.status }
    );
  }

  const data = await res.json();

  return { data, rate };
}
