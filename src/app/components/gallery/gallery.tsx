"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import type { Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

type FetchPage = (page: number) => Promise<UnsplashImage[]>;

export default function Gallery({
  initial,
  fetchPage,
  columns = { 639: 1, 767: 2, 1023: 3 },
}: {
  initial: UnsplashImage[];
  fetchPage: FetchPage;
  columns?: Record<number, number>;
}) {
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
    setPage((prev) => prev + 1);
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<p className="p-2">Loading…</p>}
      endMessage={<p className="p-2 text-center">End of feed.</p>}
      className="md:px-6"
    >
      <ResponsiveMasonry columnsCountBreakPoints={columns}>
        <Masonry sequential={true}>
          {items.map((img) => (
            <div key={img.id} style={{ overflow: "hidden", borderRadius: 6 }}>
              <Image
                src={img.urls.regular}
                alt={img.alt_description ?? ""}
                width={img.width}
                height={img.height}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </InfiniteScroll>
  );
}
