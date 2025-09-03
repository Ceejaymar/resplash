"use client";

import type { Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

import Gallery from "./gallery";

interface SearchGallery {
  initial: UnsplashImage[];
  query: string;
}

export default function SearchGallery({ initial, query }: SearchGallery) {
  async function fetchPage(page: number) {
    const res = await fetch(`/api/search/photos?q=${query}&page=${page}`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.results ?? [];
  }

  return <Gallery initial={initial} fetchPage={fetchPage} />;
}
