import "server-only";

const api = "https://api.unsplash.com/topics";
const key = process.env.UNSPLASH_ACCESS_KEY;

export async function getTopics(page = 1, perPage = 30) {
  const res = await fetch(`${api}?page=${page}&per_page=${perPage}`, {
    headers: { authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return Response.json(
      { error: "Unsplash error", status: res.status },
      { status: res.status }
    );
  }

  const data = await res.json();

  return { data };
}
