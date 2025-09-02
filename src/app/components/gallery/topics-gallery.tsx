"use client";

import type { Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

import Gallery from "./gallery";

interface TopicsGallery {
  initial: UnsplashImage[];
  slug: string;
}

export default function TopicsGallery({ initial, slug }: TopicsGallery) {
  async function fetchPage(page: number) {
    const res = await fetch(`/api/topics/${slug}/photos?page=${page}`);
    if (!res.ok) return [];
    return res.json();
  }

  return <Gallery initial={initial} fetchPage={fetchPage} />;
}
