import React from "react";
import SectionTitle from "components/con/common/typography/SectionTitle";
import classNames from "classnames";
import styles from "./legalPage.module.css";

interface LegalPageProps {
  content?: string;
  title: string;
}

export default function LegalPage({ content, title }: LegalPageProps) {
  return (
    <div className="container flex flex-col items-center pt-10">
      <SectionTitle h1 dark lined>
        <strong>{title}</strong>
      </SectionTitle>
      {content ? (
        <div
          className={classNames(
            "pt-16 px-12 pb-36 font-light leading-relaxed bg-grey max-w-5xl dotted-corner",
            styles.content
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null}
    </div>
  );
}
