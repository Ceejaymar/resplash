import { type Basic as Topic } from "unsplash-js/dist/methods/topics/types";
import { getTopics } from "@/lib/topics";
import TopicPill from "./topic-pill";

export default async function Topics() {
  const { data } = await getTopics(1, 30);

  return (
    <div className="relative">
      <div className="flex items-center py-8 whitespace-nowrap gap-3 overflow-scroll no-scrollbar px-6">
        {data.map((topic: Topic) => (
          <TopicPill
            key={topic.id}
            title={topic.title}
            slug={topic.slug}
            image={topic.cover_photo?.urls.raw || ""}
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
