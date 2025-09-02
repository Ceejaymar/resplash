import Image from "next/image";

import { getTopics } from "@/lib/topics";
import { getTopicPhotos } from "@/lib/topics";
import TopicsGallery from "@/app/components/gallery/topics-gallery";

export default async function Page({ params }) {
  const slug = await params.slug;
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
        {/* username: 'mischievous_penguins',
      name: 'Casey Horner',location: 'Manteca  Ca' */}
      </div>

      <TopicsGallery initial={topicPhotos} slug={slug} />
    </div>
  );
}
