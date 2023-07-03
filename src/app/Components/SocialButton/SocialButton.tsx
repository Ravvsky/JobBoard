"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
const TwitterLogo = dynamic<React.SVGProps<SVGSVGElement>>(
  () => import("../../assets/icons/twitter-logo.svg"),
);
const GithubLogo = dynamic<React.SVGProps<SVGSVGElement>>(
  () => import("../../assets/icons/github-logo.svg"),
);
const DribbleLogo = dynamic<React.SVGProps<SVGSVGElement>>(
  () => import("../../assets/icons/dribble-logo.svg"),
);
const LinkedinLogo = dynamic<React.SVGProps<SVGSVGElement>>(
  () => import("../../assets/icons/linkedin-logo.svg"),
);

type IconType = "twitter" | "github" | "dribble" | "linkedin";
interface SocialButtonProps {
  icon: IconType;
  href: string;
}
const SocialButton = ({ icon, href }: SocialButtonProps) => {
  let selectedIcon;

  switch (icon) {
    case "twitter":
      selectedIcon = (
        <TwitterLogo className="transition-all duration-300 group-hover:fill-[#1DA1F2] " />
      );
      break;
    case "github":
      selectedIcon = (
        <GithubLogo className="transition-all duration-300 group-hover:fill-[#6cc644]" />
      );
      break;
    case "dribble":
      selectedIcon = (
        <DribbleLogo className="transition-all duration-300 group-hover:fill-[#ea4c89]" />
      );
      break;
    case "linkedin":
      selectedIcon = (
        <LinkedinLogo className="transition-all duration-300 group-hover:fill-[#0077B5]" />
      );
      break;
    default:
      selectedIcon = null;
      break;
  }

  if (href && typeof href === "string") {
    const link = href.startsWith("https://" || "http://")
      ? href
      : "https://" + href;

    return (
      <Link
        className="group flex h-[3.2rem]  w-[3.2rem] items-center justify-center rounded-[0.8rem] bg-light-gray fill-white "
        href={link || ""}
        target="_blank"
      >
        {selectedIcon}
      </Link>
    );
  } else return <></>;
};

export default SocialButton;
