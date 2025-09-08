import Image from "next/image";
import type { Full as UnsplashImage } from "unsplash-js/dist/methods/photos/types";

import { getPhoto } from "@/lib/unsplash";
import formatNumber from "@/app/utils/formatNumberString";
import formatDate from "@/app/utils/formatDate";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ImagesWithExtras extends UnsplashImage {
  views: number;
  downloads: number;
  tags: { type: string; title: string }[];
  blurDataURL: string;
}

export default async function photo({ params }: PageProps) {
  const { id } = await params;
  const { data } = await getPhoto(id);
  const photo = data as ImagesWithExtras;

  const photoData = [
    {
      name: "views",
      value: formatNumber(photo.views),
    },
    {
      name: "date",
      value: formatDate(photo.created_at),
    },
    {
      name: "downloads",
      value: formatNumber(photo.downloads),
    },
  ];

  return (
    <main className="flex flex-col gap-6 pt-5 px-6 md:pt-15 md:gap-10">
      <header className="flex justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={photo.user.profile_image.medium}
              alt={`${photo.user.username}'s profile avatar`}
              fill
              sizes="40px"
            />
          </div>
          <span className="font-semibold text-sm md:text-base">
            {photo.user.name}
          </span>
        </div>
        <button className=" bg-indigo-700 text-white text-sm py-2 px-4 rounded md:text-base">
          Download
        </button>
      </header>

      <div className="flex flex-col gap-5 rounded-xl overflow-hidden">
        <figure className="relative w-full h-[70vh] overflow-hidden">
          <Image
            priority
            src={photo.urls.full}
            alt={photo.alt_description || ""}
            fill
            className="object-contain"
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
          />
        </figure>
        {(photo.description || photo.alt_description) && (
          <span className="text-2xl font-semibold text-neutral-900">
            {photo.description || photo.alt_description}
          </span>
        )}
      </div>

      <section className="flex flex-col gap-5 justify-between max-w-1/2 text-sm md:text-base md:flex-row md:gap-0">
        {photoData.map((d) => (
          <article key={d.name} className="flex flex-col gap-1">
            <span className="text-neutral-600 capitalize">{d.name}</span>
            <span className="font-semibold text-neutral-900">{d.value}</span>
          </article>
        ))}
      </section>

      <ul className="flex flex-wrap gap-4 mt-8">
        {photo.tags.map((tag) => (
          <li
            key={tag.title}
            className="font-medium capitalize text-neutral-600"
          >
            #{tag.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
