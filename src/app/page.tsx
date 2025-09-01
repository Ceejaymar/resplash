import { getPhotos } from "@/lib/unsplash";
import styles from "./page.module.css";
import Gallery from "./components/gallery/gallery";
import Topics from "./components/topics/topics";

export default async function Home() {
  const { data, rate } = await getPhotos(1, 30);

  return (
    <section>
      <Topics />
      <Gallery images={data} />
    </section>
  );
}
