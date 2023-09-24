import Image from "next/image";
import type { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

const RoundedImage = ({
  src,
  alt,
  width,
  height,
  onClick,
  className,
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={twMerge(
        `max-h-[4rem] max-w-[4rem] rounded-[55rem] bg-main-blue object-contain p-[0.5rem] ${className}`,
      )}
      onClick={onClick}
    />
  );
};

export default RoundedImage;
