import { searchPhotos } from "@/lib/unsplash";
import SearchGallery from "../components/gallery/search-gallery";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  if (!q) return <p>No query provided.</p>;

  const { data } = await searchPhotos(1, 30, q);

  return (
    <main>
      <h1 className="px-4 mb-4 text-lg font-semibold text-neutral-800">
        Search results for "{q}"
      </h1>
      <SearchGallery initial={data.results} query={q} />;
    </main>
  );
}
