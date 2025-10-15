"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { type UnsplashImage } from "@/types";

type FetchPage = (page: number) => Promise<UnsplashImage[]>;

export default function Gallery({
  initial,
  fetchPage,
  columns = { 767: 2, 1023: 3 },
}: {
  initial: UnsplashImage[];
  fetchPage: FetchPage;
  columns?: Record<number, number>;
}) {
  const observedRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const seen = useRef(new Set(initial.map((i) => i.id)));
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
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
        uniques.push(p as UnsplashImage);
      }
    }

    setItems((prev) => [...prev, ...uniques]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (!observedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(observedRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMore]);

  return (
    <section>
      <ResponsiveMasonry columnsCountBreakPoints={columns}>
        <Masonry sequential={true}>
          {items.map((img) => (
            <div
              className="relative group"
              key={img.id}
              style={{ overflow: "hidden", borderRadius: 6 }}
            >
              <Image
                src={img.urls.regular}
                alt={img.alt_description ?? ""}
                width={img.width}
                height={img.height}
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
              />
              <Link href={`/photo/${img.id}`}>
                <div className="absolute top-0 bottom-0 w-full flex items-end pb-4 pl-4 bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={img.user.profile_image.medium}
                        alt={`${img.user.username}'s profile avatar`}
                        fill
                        sizes="40px"
                      />
                    </div>
                    <div className="text-white">
                      <span className="font-semibold">{img.user.name}</span>
                      <p className="text-white/70 line-clamp-1">
                        {img.description || img.alt_description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {!hasMore && (
        <p className="p-2 text-center text-xl font-semibold">End of feed</p>
      )}
      {hasMore && loading ? (
        <p className="p-2 text-center text-xl font-semibold">Loading…</p>
      ) : (
        <div ref={observedRef}></div>
      )}
    </section>
  );
}
