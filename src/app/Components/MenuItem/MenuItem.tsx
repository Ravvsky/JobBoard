import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`text-[1.6rem] hover:text-main-blue transition-all ease-in duration-200 ${
        pathname === href && "text-main-blue"
      }`}
    >
      {children}
    </Link>
  );
};

export default MenuItem;
