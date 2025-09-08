import Image from "next/image";

import { getTopics, getTopicPhotos } from "@/lib/topics";
import TopicsGallery from "@/app/components/gallery/topics-gallery";
import Topics from "@/app/components/topics/topics";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { data: topic } = await getTopics(1, 30, slug);
  const { data: topicPhotos } = await getTopicPhotos(1, 30, slug);

  const coverPhoto = topic.cover_photo
    ? topic.cover_photo.urls.full
    : topicPhotos[0].urls.full;

  const coverAlt = topic.cover_photo
    ? topic.cover_photo.alt_description
    : topicPhotos[0].alt_description;

  return (
    <div>
      <Topics currentPath={slug} />
      <div className="relative w-full h-96 mb-8">
        <Image
          className="md:px-6"
          src={coverPhoto}
          alt={coverAlt}
          fill
          style={{ objectFit: "cover", objectPosition: "50% 70%" }}
          priority
        />
        <div className="absolute top-0 bottom-0 flex flex-col gap-5 justify-center pl-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
          <h1 className="z-10 text-3xl text-neutral-900 font-semibold tracking-tight">
            {topic.title}
          </h1>
          <p className="z-10 text-neutral-900 font-medium max-w-2/3 md:max-w-1/2">
            {topic.description}
          </p>
        </div>
      </div>
      <TopicsGallery initial={topicPhotos} slug={slug} />
    </div>
  );
}
