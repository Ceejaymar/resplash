"use client";

import {
  HeartStraightIcon as HeartStraight,
  type IconWeight,
} from "@phosphor-icons/react";

type HeartStraightIcon = {
  color?: string;
  size?: number;
  weight?: IconWeight;
};

export default function HeartStraightIcon({
  color,
  size,
  weight,
}: HeartStraightIcon) {
  return (
    <HeartStraight
      aria-label="favorite product"
      size={size}
      weight={weight}
      color={color}
    />
  );
}
