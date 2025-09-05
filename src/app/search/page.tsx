import { searchPhotos } from "@/lib/unsplash";
import SearchGallery from "../components/gallery/search-gallery";

interface PageProps {
  searchParams?: { q?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const q = searchParams?.q ?? "";

  if (!q) return <p>No query provided.</p>;

  const { data } = await searchPhotos(1, 30, q);

  return <SearchGallery initial={data.results} query={q} />;
}
