import type { Basic } from "unsplash-js/dist/methods/photos/types";
import { type Basic as Topic } from "unsplash-js/dist/methods/topics/types";

export interface UnsplashImage extends Basic {
  views: number;
  downloads: number;
  tags: { type: string; title: string }[];
  blurDataURL: string;
}

export interface UnsplashTopic extends Omit<Topic, "cover_photo"> {
  blurDataURL?: string;
  cover_photo:
    | ((Topic extends { cover_photo: infer T } ? T : unknown) & {
        blurDataURL?: string;
      })
    | null;
}
