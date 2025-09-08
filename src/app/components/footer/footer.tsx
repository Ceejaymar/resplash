import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="flex flex-col justify-between items-center gap-5 mt-10 p-4 md:px-6 text-neutral-600 md:flex-row"
    >
      © Resplash, Inc. All rights reserved.
      <div className="flex gap-4">
        <a
          href="https://www.youtube.com/@Losliving"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YoutubeLogoIcon size="24" weight="regular" color="#525252" />
        </a>
        <a
          href="https://www.instagram.com/steadyonthego"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogoIcon size="24" weight="regular" color="#525252" />
        </a>
        <a
          href="https://www.linkedin.com/in/carmart/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinLogoIcon size="24" weight="regular" color="#525252" />
        </a>
        <a
          href="https://github.com/Ceejaymar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogoIcon size="24" weight="regular" color="#525252" />
        </a>
      </div>
    </footer>
  );
}
