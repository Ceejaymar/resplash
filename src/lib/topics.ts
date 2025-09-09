import "server-only";

import { blurhashToDataUrl } from "../app/utils/blurHashToData";

const api = "https://api.unsplash.com/topics";
const key = process.env.UNSPLASH_ACCESS_KEY;

interface BlurHashable {
  blur_hash?: string;
  [key: string]: unknown;
}

interface WithBlurDataURL extends BlurHashable {
  blurDataURL?: string;
}

async function withBlurhash<T extends BlurHashable>(
  item: T
): Promise<T & WithBlurDataURL> {
  return {
    ...item,
    blurDataURL: item.blur_hash
      ? await blurhashToDataUrl(item.blur_hash)
      : undefined,
  };
}

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

  if (Array.isArray(data)) {
    return {
      data: await Promise.all(
        data.map(async (topic) => ({
          ...topic,
          cover_photo: topic.cover_photo?.blur_hash
            ? {
                ...topic.cover_photo,
                blurDataURL: await blurhashToDataUrl(
                  topic.cover_photo.blur_hash,
                  32,
                  32
                ),
              }
            : topic.cover_photo,
        }))
      ),
    };
  } else {
    return {
      data: {
        ...data,
        cover_photo: data.cover_photo?.blur_hash
          ? {
              ...data.cover_photo,
              blurDataURL: await blurhashToDataUrl(
                data.cover_photo.blur_hash,
                32,
                32
              ),
            }
          : data.cover_photo,
      },
    };
  }
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

  const response = await res.json();
  const data = await Promise.all(response.map(withBlurhash));

  return { data };
}
