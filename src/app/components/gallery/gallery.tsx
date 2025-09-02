"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";
import styles from "./gallery.module.scss";

export default function Gallery({ initial, fetchPage }) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const seen = useRef(new Set(initial.map((i) => i.id)));

  async function loadMore() {
    const next = page + 1;
    const res = await fetchPage(next);
    if (!res.length) {
      setHasMore(false);
      return;
    }

    const uniques: UnsplashImage[] = [];
    for (const p of res) {
      if (!seen.current.has(p.id)) {
        seen.current.add(p.id);
        uniques.push(p);
      }
    }
    setItems((prev) => [...prev, ...uniques]);
    setPage(next);
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<p className="p-2">Loading…</p>}
        endMessage={<p className="p-2 text-center">End of feed.</p>}
        className={styles.imageContainer}
        scrollThreshold={0.9}
      >
        {items.map((image) => (
          <Image
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description ?? ""}
            width={500}
            height={500}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
