import "server-only";

import { blurhashToDataUrl } from "../scripts/blurHashToData";

const api = "https://api.unsplash.com";
const key = process.env.UNSPLASH_ACCESS_KEY;

async function withBlurhash(item) {
  return {
    ...item,
    blurDataURL: item.blur_hash
      ? await blurhashToDataUrl(item.blur_hash)
      : undefined,
  };
}

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
    const body = await res.text().catch(() => "");
    const err = new Error(body || `Unsplash ${res.status}`) as Error & {
      status: number;
    };
    err.status = res.status;
    throw err;
  }

  const response = await res.json();
  const data = await Promise.all(response.map(withBlurhash));

  return { data, rate };
}

export async function searchPhotos(page = 1, perPage = 30, query: string) {
  const res = await fetch(
    `${api}/search/photos?query=${query}&page=${page}&per_page=${perPage}`,
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

export async function getPhoto(id: string) {
  const res = await fetch(`${api}/photos/${id}`, {
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
