import Image from "next/image";
import Link from "next/link";

type TopicPill = {
  title: string;
  image: string;
  slug: string;
};

export default function TopicPill({ title, image, slug }: TopicPill) {
  return (
    <Link
      href={`/topics/${slug}`}
      className="flex items-center gap-2 bg-gray-200 rounded-full pl-1 pr-4 py-1 cursor-pointer"
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image src={image} alt={title} fill sizes="40px" />
      </div>
      {title}
    </Link>
  );
}
