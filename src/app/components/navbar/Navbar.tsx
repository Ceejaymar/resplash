import Search from "../search/search";

export default function Navbar() {
  return (
    <nav data-testid="navigation" className="flex gap-16 py-4 font-bold px-6">
      Resplash
      <Search />
    </nav>
  );
}
