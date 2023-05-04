import Image from "next/image";
import type { ImageProps } from "next/image";

const RoundedImage = ({
  src,
  alt,
  width,
  height,
  className,
  onClick,
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`h-[4rem] max-h-[4rem] w-[4rem] max-w-[4rem] rounded-[55rem] bg-main-blue object-contain p-[0.5rem] ${className}`}
      onClick={onClick}
    />
  );
};

export default RoundedImage;
