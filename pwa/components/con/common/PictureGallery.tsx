"use client";
import React, { PropsWithChildren, useContext } from "react";
import AnimatedPictureImage from "components/con/common/AnimatedPictureImage";
import Button from "components/con/common/Button";
import { LanguageContext } from "contexts/con/LanguageContext";

interface PictureGalleryProps extends PropsWithChildren {
  link?: string;
  className?: string;
}

export default function PictureGallery({
  link,
  children,
  className = "",
}: PictureGalleryProps) {
  const { t } = useContext(LanguageContext);

  return (
    <div className={`bg-white relative w-full ${className}`}>
      <div className="container text-center">
        <div className="grid grid-cols-2 gap-8 | lg:grid-cols-3">
          {React.Children.map(children, (child) => (
            <AnimatedPictureImage>{child}</AnimatedPictureImage>
          ))}
        </div>
        {link ? (
          <Button className="mt-5" empty external to={link}>
            {t("last_edition.see_more_pics")}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
