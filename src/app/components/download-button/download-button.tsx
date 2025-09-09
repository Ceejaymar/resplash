"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";

import { scaledDimensions } from "@/app/utils/scaleDimension";
import { sizeMap, SizeLabel } from "@/types";

type DownloadButton = {
  photoId: string;
  slug: string;
  urls: Record<string, string>;
  width: number;
  height: number;
};

export default function DownloadButton({
  photoId,
  slug,
  urls,
  width,
  height,
}: DownloadButton) {
  const [open, setOpen] = useState(false);

  async function handleDownload(sizeLabel: SizeLabel) {
    try {
      const field = sizeMap[sizeLabel];
      const filename = `${slug}-${field.field}.jpg`;
      const downloadUrl = `/api/download?url=${encodeURIComponent(
        urls[field.field]
      )}&photoId=${photoId}&filename=${filename}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-indigo-700 text-white py-2 px-4 rounded-md cursor-pointer"
      >
        Download
        <CaretDownIcon />
      </button>
      {open && (
        <div className="w-[229px] absolute right-0 flex flex-col  p-2 mt-1 bg-white border border-solid border-neutral-200 rounded-lg shadow z-20 ">
          {(Object.keys(sizeMap) as SizeLabel[]).map((label) => {
            const { field, width: targetWidth } = sizeMap[label];
            const dims = scaledDimensions(width, height, targetWidth);

            return (
              <button
                key={field}
                className="flex gap-2 text-neutral-700 text-sm p-2 rounded-md cursor-pointer transition duration-300 hover:bg-gray-200"
                onClick={() => handleDownload(label)}
              >
                <span className="font-semibold text-neutral-900">{label}</span>{" "}
                ({dims.width} × {dims.height})
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
