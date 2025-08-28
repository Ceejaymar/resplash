import "server-only";

const api = "https://api.unsplash.com";
// https://api.unsplash.com/photos?page=1
const key = process.env.UNSPLASH_ACCESS_KEY;

export async function newPhotos() {
  const res = await fetch(`${api}/photos?page=1`, {
    headers: { authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    next: { revalidate: 3600 },
  });

  const rate = {
    limit: res.headers.get("X-Ratelimit-Limit"),
    remaining: res.headers.get("X-Ratelimit-Remaining"),
  };

  const data = await res.json();

  return { data, rate };
}
