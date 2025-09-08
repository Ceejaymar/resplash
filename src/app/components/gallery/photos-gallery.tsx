"use client";

import Gallery from "./gallery";
import { type UnsplashImage } from "@/types";

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
