import Image from "next/image";
import Search from "../search/search";
import resplashLogo from "../../../../public/resplash-icon.webp";

export default function Navbar() {
  return (
    <nav
      data-testid="navigation"
      className="flex items-center gap-4 py-4 font-bold px-6 md:gap-16"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={resplashLogo}
          alt="resplash logo"
          width={32}
          height={32}
          className="rounded-sm"
        />
        <span className="text-xl tracking-tighter font-semibold hidden md:block">
          Resplash
        </span>
      </div>
      <Search />
    </nav>
  );
}
