import Image from "next/image";
import React from "react";

type TopicPill = { title: string; image: string };

export default function TopicPill({ title, image }: TopicPill) {
  return (
    <span className="flex items-center gap-2 bg-gray-200 rounded-full pl-1 pr-4 py-1 cursor-pointer">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image src={image} alt={title} fill sizes="40px" />
      </div>
      {title}
    </span>
  );
}
