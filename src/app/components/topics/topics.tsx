import { getTopics } from "@/lib/topics";

import TopicPill from "./topic-pill";

export default async function Topics() {
  const { data } = await getTopics(1, 30);
  console.log("topics", data);

  return (
    <div className="flex items-center py-8 whitespace-nowrap gap-3 overflow-scroll no-scrollbar">
      {data.map((topic) => (
        <TopicPill
          key={topic.id}
          title={topic.title}
          image={topic["cover_photo"].urls.small}
        />
      ))}
    </div>
  );
}
