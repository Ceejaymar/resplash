"use client";

import { useState } from "react";
import Image from "next/image";
import { type Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./gallery.module.scss";

export default function Gallery({ images }: { images: UnsplashImage[] }) {
  const [photos, setPhotos] = useState(images);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    setLoading(true);
    const next = page + 1;

    try {
      const res = await fetch(`/api/photos?page=${next}`);

      if (!res.ok) {
        setHasMore(false);
        throw new Error(`HTTP ${res.status}`);
      }

      const moreImages = await res.json();
      setPhotos((prev) => {
        const map = new Map(prev.map((p) => [p.id, p]));
        for (const p of moreImages) map.set(p.id, p);
        return Array.from(map.values());
      });
      setPage(next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={photos.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        className={styles.imageContainer}
      >
        {photos.map((image: UnsplashImage) => {
          return (
            <Image
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description ?? ""}
              // blurDataURL={image.blur_hash}
              // placeholder="blur"
              width={500}
              height={500}
            />
          );
        })}
      </InfiniteScroll>
      <div>{loading && <p>Loading...</p>}</div>
    </div>
  );
}
