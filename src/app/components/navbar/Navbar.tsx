import classes from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav data-testid="navigation" className="flex gap-16">
      Resplash
      <form>
        <input type="text" placeholder="Search..." />
      </form>
    </nav>
  );
}
