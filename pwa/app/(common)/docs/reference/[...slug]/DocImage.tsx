"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function DocImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const pathname = usePathname();
  const { src, ...otherProps } = props;
  const newSrc = `https://raw.githubusercontent.com/api-platform/docs/3.1/${pathname?.replace(
    "docs/",
    ""
  )}/${src}`;

  return (
    <Image
      {...otherProps}
      alt={otherProps.alt || ""}
      src={newSrc}
      width={500}
      height={300}
      placeholder="empty"
    />
  );
}
