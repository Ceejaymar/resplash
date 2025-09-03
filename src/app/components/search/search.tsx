import React from "react";

export default function Search() {
  return (
    <div>
      <form action="/search" method="get">
        <input
          type="text"
          name="q"
          placeholder="Search photos…"
          className="border rounded px-3 py-1"
        />
      </form>
    </div>
  );
}
