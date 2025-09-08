"use client";

import Gallery from "./gallery";
import { type UnsplashImage } from "@/types";

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
