import Image from "next/image";
import { type Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

import { newPhotos } from "@/lib/unsplash";

export default async function Home() {
  const { data, rate } = await newPhotos();
  console.log("dataa", data);
  console.log("rate", rate);
  return (
    <>
      {data.map((image: UnsplashImage) => {
        return (
          <Image
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description ?? ""}
            blurDataURL={image.blur_hash}
            placeholder="blur"
            width={500}
            height={500}
          />
        );
      })}
    </>
  );
}
