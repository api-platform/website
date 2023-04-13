"use client";
import React, { useCallback, useContext } from "react";
import Image from "next/image";
import useDynamicRefs from "hooks/con/useDynamicRefs";
import Button from "components/con/common/Button";
import { LanguageContext } from "contexts/con/LanguageContext";

interface ReviewCoverProps {
  edition: string;
  baseline: JSX.Element;
  button?: JSX.Element;
  title: string;
}

export default function ReviewCover({
  edition,
  baseline,
  title,
  button,
}: ReviewCoverProps) {
  const [getRef] = useDynamicRefs();
  const { t } = useContext(LanguageContext);

  const scrollToList = useCallback(() => {
    const reviewList = getRef("review-list");

    if (reviewList) reviewList.current?.scrollIntoView({ behavior: "smooth" });
  }, [getRef]);

  return (
    <section>
      <div className="absolute w-full h-screen border-b-4 border-b-blue bg-blue-black">
        <Image
          src={`/images/con/editions/${edition}.jpg`}
          alt="Api platform con 2021 picture"
          fill
          className="opacity-50 object-cover"
        />
      </div>
      <div className="container relative z-10 w-full min-h-screen flex flex-col justify-center pt-24 text-white">
        <h1 className="flex flex-col">
          <span className=" text-8xl font-title font-bold">{`${edition} review`}</span>
          <span className="uppercase text-blue font-title text-3xl font-semibold">
            {title}
          </span>
        </h1>
        <div className="text-xl my-6 font-light">{baseline}</div>
        <div className="flex flex-col gap-4 | sm:flex-row">
          <Button onClick={scrollToList}>{t("review.button")}</Button>
          {button}
        </div>
      </div>
    </section>
  );
}
