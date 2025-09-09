import Image from "next/image";
import Link from "next/link";

type TopicPill = {
  title: string;
  image: string;
  slug: string;
  currentPath: string;
  blurDataURL?: string;
};

export default function TopicPill({
  title,
  image,
  slug,
  currentPath,
  blurDataURL,
}: TopicPill) {
  const active = currentPath === slug;

  return (
    <Link
      href={`/topics/${slug}`}
      className={`flex items-center gap-2 no-underline rounded-full pl-1 pr-4 py-1 cursor-pointer ${
        active ? "bg-indigo-200" : "bg-neutral-100"
      }`}
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="40px"
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
        />
      </div>
      <span className="text-sm">{title}</span>
    </Link>
  );
}
