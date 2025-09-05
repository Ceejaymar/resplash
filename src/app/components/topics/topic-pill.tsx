import Image from "next/image";
import Link from "next/link";

type TopicPill = {
  title: string;
  image: string;
  slug: string;
  currentPath: string;
};

export default function TopicPill({
  title,
  image,
  slug,
  currentPath,
}: TopicPill) {
  const active = currentPath === slug;

  return (
    <Link
      href={`/topics/${slug}`}
      className={`flex items-center gap-2 no-underline rounded-full pl-1 pr-4 py-1 cursor-pointer ${
        active ? "bg-indigo-200" : "bg-gray-200"
      }`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image src={image} alt={title} fill sizes="40px" />
      </div>
      <span>{title}</span>
    </Link>
  );
}
