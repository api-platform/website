import React, { PropsWithChildren } from "react";
import useAnimation, { DirectionType } from "hooks/con/useAnimation";

interface AnimatedPictureImageProps extends PropsWithChildren {
  direction?: DirectionType;
}

export default function AnimatedPictureImage({
  direction = "scale",
  children,
}: AnimatedPictureImageProps) {
  const animation = useAnimation(direction);
  return (
    <div
      className="w-full aspect-square relative max-w-[400px]"
      ref={animation}
    >
      {children}
    </div>
  );
}
