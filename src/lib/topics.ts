import "server-only";

const api = "https://api.unsplash.com/topics";
const key = process.env.UNSPLASH_ACCESS_KEY;

export async function getTopics(page = 1, perPage = 30, slug = "") {
  const res = await fetch(`${api}/${slug}?page=${page}&per_page=${perPage}`, {
    headers: { authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(body || `Unsplash ${res.status}`) as Error & {
      status: number;
    };
    err.status = res.status;
    throw err;
  }

  const data = await res.json();

  return { data };
}

export async function getTopicPhotos(page = 1, perPage = 10, slug = "") {
  const res = await fetch(
    `${api}/${slug}/photos?page=${page}&per_page=${perPage}`,
    {
      headers: { authorization: `Client-ID ${key}`, "Accept-Version": "v1" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(body || `Unsplash ${res.status}`) as Error & {
      status: number;
    };
    err.status = res.status;
    throw err;
  }

  const data = await res.json();

  return { data };
}
