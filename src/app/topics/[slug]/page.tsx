import Image from "next/image";

import { getTopics, getTopicPhotos } from "@/lib/topics";
import TopicsGallery from "@/app/components/gallery/topics-gallery";

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
      <div className="relative w-full h-96 mb-8">
        <Image
          src={coverPhoto}
          alt={coverAlt}
          fill
          style={{ objectFit: "cover", objectPosition: "50% 70%" }}
        />
      </div>
      <TopicsGallery initial={topicPhotos} slug={slug} />
    </div>
  );
}
