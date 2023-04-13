import { LanguageContext } from "contexts/con/LanguageContext";
import React, { useContext } from "react";
import SpeakerImage from "./SpeakerImage";

interface EmptySpeakerCircleProps {
  index: 1 | 2 | 3;
}

export default function EmptySpeakerCircle({ index }: EmptySpeakerCircleProps) {
  const { t } = useContext(LanguageContext);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="group">
        <div className="w-60 h-60">
          <SpeakerImage image={`/images/con/empty-speaker${index}.svg`} />
        </div>
        <div className="text-inherit uppercase font-title transition-all group-hover:-translate-y-2 mt-7">
          <h3 className="inline-block text-xl leading-tight font-semibold transition-all group-hover:text-blue lined-center">
            {t("coming_soon")}
          </h3>
        </div>
      </div>
    </div>
  );
}
