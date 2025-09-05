import { getPhoto } from "@/lib/unsplash";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function photo({ params }: PageProps) {
  const { id } = await params;

  const { data: photo } = await getPhoto(id);

  return <div>{photo.location.name}</div>;
}
