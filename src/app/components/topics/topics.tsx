import { type Basic as Topic } from "unsplash-js/dist/methods/topics/types";
import { getTopics } from "@/lib/topics";
import TopicPill from "./topic-pill";

type Topics = {
  currentPath?: string;
};

export default async function Topics({ currentPath }: Topics) {
  const { data } = await getTopics(1, 30);

  return (
    <div className="relative">
      <div className="flex items-center py-8 whitespace-nowrap gap-3 overflow-scroll no-scrollbar px-4 md:px-6">
        {data.map((topic: Topic) => (
          <TopicPill
            key={topic.id}
            title={topic.title}
            slug={topic.slug}
            image={topic.cover_photo?.urls.raw || ""}
            currentPath={currentPath || ""}
            blurDataURL={topic.cover_photo.blurDataURL}
          />
        ))}
      </div>
      <div
        className="
          pointer-events-none absolute inset-y-0 right-0 w-16 z-10
          bg-gradient-to-l from-white to-transparent
        "
      />
    </div>
  );
}
