import { searchPhotos } from "@/lib/unsplash";
import SearchGallery from "../components/gallery/search-gallery";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  if (!q) return <p>No query provided.</p>;

  const { data } = await searchPhotos(1, 30, q);
  // console.log("Search data:", data);
  return (
    <main>
      <h1 className="py-2 px-4 mb-4 text-lg text-neutral-800 md:px-6 md:py-4">
        Search results for{" "}
        <span className="font-semibold">&quot;{q}&quot;</span>
      </h1>
      <SearchGallery initial={data} query={q} />
    </main>
  );
}
