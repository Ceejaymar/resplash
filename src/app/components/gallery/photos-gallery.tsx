"use client";

import type { Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

import Gallery from "./gallery";

interface PhotosGallery {
  initial: UnsplashImage[];
}

export default function PhotosGallery({ initial }: PhotosGallery) {
  async function fetchPage(page: number) {
    const res = await fetch(`/api/photos?page=${page}`);
    if (!res.ok) return [];
    return res.json();
  }

  return <Gallery initial={initial} fetchPage={fetchPage} />;
}
