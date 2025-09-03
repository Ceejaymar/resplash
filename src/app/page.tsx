import { getPhotos } from "@/lib/unsplash";

import PhotosGallery from "./components/gallery/photos-gallery";
import Topics from "./components/topics/topics";

export default async function Home() {
  const { data, rate } = await getPhotos(1, 30);

  return (
    <section>
      <Topics />
      <PhotosGallery initial={data} />;
    </section>
  );
}
