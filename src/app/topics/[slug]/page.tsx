import Image from "next/image";

import { getTopics } from "@/lib/topics";
import { getTopicPhotos } from "@/lib/topics";
import TopicsGallery from "@/app/components/gallery/topics-gallery";

export default async function Page({ params }) {
  const slug = params.slug;
  const topic = await getTopics(1, 30, slug);
  const topicPhotos = await getTopicPhotos(1, 30, slug);

  console.log("here we goooooo", topic.data);
  return (
    <div>
      <div className="relative w-full h-96">
        <Image
          src={topic.data.cover_photo.urls.small}
          alt={topic.data.cover_photo.alt_description}
          fill
          style={{ objectFit: "cover", objectPosition: "50% 70%" }}
        />
        {/* username: 'mischievous_penguins',
      name: 'Casey Horner',location: 'Manteca  Ca' */}
      </div>

      <TopicsGallery initial={topicPhotos.data} slug={slug} />
    </div>
  );
}
