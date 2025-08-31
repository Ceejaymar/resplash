import Image from "next/image";
import { type Basic as UnsplashImage } from "unsplash-js/dist/methods/photos/types";
import styles from "./gallery.module.scss";

export default function Gallery({ images }) {
  return (
    <div className={styles.imageContainer}>
      {images.map((image: UnsplashImage) => {
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
    </div>
  );
}
