"use client";

import Gallery from "./gallery";
import { type UnsplashImage } from "@/types";

interface SearchGalleryProps {
  initial: UnsplashImage[];
  query: string;
}

export default function SearchGallery({ initial, query }: SearchGalleryProps) {
  async function fetchPage(page: number) {
    const res = await fetch(`/api/search/photos?q=${query}&page=${page}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  }

  return <Gallery initial={initial} fetchPage={fetchPage} />;
}
