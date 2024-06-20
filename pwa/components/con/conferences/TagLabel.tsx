import classNames from "classnames";
import { LanguageContext } from "contexts/con/LanguageContext";
import tags from "data/con/conferenceTags";
import { useContext } from "react";

interface TagLabelProps {
  tag?: string;
  small?: boolean;
}

export default function TagLabel({ tag = "default", small }: TagLabelProps) {
  const { t } = useContext(LanguageContext);
  const keyTag = tag as keyof typeof tags;
  return (
    <span
      style={{
        borderColor: tags[keyTag],
        color: tags[keyTag],
      }}
      className={classNames(
        "font-title uppercase",
        small
          ? "border text-[10px] px-1 py-0.5 mb-1"
          : "border-2 text-xs px-2 py-1 mb-2"
      )}
    >
      {t(`conferences.tags.${tag}`)}
    </span>
  );
}
