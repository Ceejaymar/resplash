import { getPhotos } from "@/lib/unsplash";
import styles from "./page.module.css";
import Gallery from "./components/gallery/gallery";

export default async function Home() {
  const { data, rate } = await getPhotos(1, 30);

  return (
    <section>
      <Gallery images={data} />
    </section>
  );
}
