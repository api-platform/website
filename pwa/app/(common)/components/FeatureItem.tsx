"use client";
import * as icons from "components/icons/features";
import { PropsWithChildren } from "react";
import useAnimation from "hooks/con/useAnimation";

interface FeatureItemsProps extends PropsWithChildren {
  Icon: React.ComponentType<icons.IconProps>;
  index?: number;
}

export default function FeatureItem({
  Icon,
  children,
  index = 0,
}: FeatureItemsProps) {
  const animation = useAnimation(
    index % 2 === 0 ? "left" : "right",
    undefined,
    undefined,
    undefined,
    "-20%"
  );
  return (
    <div
      ref={animation}
      className="text-center text-white w-52 px-4 py-8 font-light leading-tight"
    >
      <Icon className="w-16 h-16 text-blue mx-auto mb-4" />
      {children}
    </div>
  );
}
