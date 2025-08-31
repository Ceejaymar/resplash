import { getPhotos } from "@/lib/unsplash";
import styles from "./page.module.css";
import Gallery from "./components/gallery/gallery";

export default async function Home() {
  const { data, rate } = await getPhotos(1, 30);

  console.log("dataa", data);
  console.log("rate", rate);

  return (
    <section>
      <Gallery images={data} />
    </section>
  );
}
