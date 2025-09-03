import React from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";

export default function Search() {
  return (
    <div className="relative w-full">
      <form action="/search" method="get" className="relative">
        <input
          type="text"
          name="q"
          placeholder="Search image Eg. Landscape"
          className="w-full border border-gray-200 rounded-sm px-4 py-2 
          bg-[#e7e7e7] text-sm font-medium focus:bg-white focus:outline-gray-200 focus:outline-1"
        />
        <MagnifyingGlassIcon
          size="20px"
          weight="bold"
          color="#767676"
          className="absolute top-2 right-3"
        />
      </form>
    </div>
  );
}
