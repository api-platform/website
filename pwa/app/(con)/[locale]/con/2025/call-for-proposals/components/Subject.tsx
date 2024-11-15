"use client";
import { useContext } from "react";
import { LanguageContext } from "contexts/con/LanguageContext";
import SectionTitle from "components/con/common/typography/SectionTitle";
import Button from "components/con/common/Button";
import icons from "./icons/icons";

function Item({
  title,
  Icon,
  text,
}: {
  title: string;
  text: string;
  Icon: React.ComponentType;
}) {
  return (
    <div className="flex flex-col gap-4 items-center w-1/3 max-w-64 text-center">
      <div className="rounded-full bg-white size-28 relative flex items-center justify-center">
        <Icon />
        <div className="size-[110%] absolute max-w-none bg-circle bg-no-repeat left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="font-title text-lg text-blue font-extrabold">{title}</p>
      <p>{text}</p>
    </div>
  );
}

type IconKeys = keyof typeof icons;

export default function Informations() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="bg-grey pb-12 relative z-20">
      <div className="container flex flex-col items-center gap-12">
        <SectionTitle small lined>
          <strong>{t("2025.cfp.subject.title")}</strong>
        </SectionTitle>
        <div className="flex flex-wrap justify-center gap-24">
          {[
            "performance",
            "feedback",
            "good_practices",
            "archi",
            "ia",
            "security",
          ].map((s) => (
            <Item
              key={s}
              text={t(`2025.cfp.subject.${s}.text`)}
              title={t(`2025.cfp.subject.${s}.title`)}
              Icon={icons[s as IconKeys]}
            />
          ))}
        </div>
        <Button size="large" external to="https://forms.gle/kNpkFsEZshYnfJST6">
          {t("2025.cfp.button_subscribe")}
        </Button>
      </div>
    </div>
  );
}
