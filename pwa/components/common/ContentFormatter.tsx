import classNames from "classnames";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./ContentFormatter.module.css";

export default function ContentFormatter({
  children,
  className,
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div className={classNames(className, styles.content)}>{children}</div>
  );
}
