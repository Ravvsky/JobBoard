import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({
  children,
  href,
  currentItemColored,
}: {
  children: React.ReactNode;
  href: string;
  currentItemColored: boolean;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-[1.6rem] hover:text-main-blue transition-all ease-in duration-200 ${
        currentItemColored && pathname === href && "text-main-blue"
      }`}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
