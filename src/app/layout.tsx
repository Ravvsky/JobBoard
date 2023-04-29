import { Metadata } from "next";
import Navigation from "./Components/Navigation/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Job Board Main Page",
  description: "Job Board description",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} m-auto px-[2rem] sm:max-w-[60rem] sm:px-0 md:max-w-[74rem] lg:max-w-[90rem] xl:max-w-[120rem] 2xl:max-w-[144rem]`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
