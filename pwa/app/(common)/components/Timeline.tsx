"use client";

import { useSearchParams } from "next/navigation";
import classNames from "classnames";
import styles from "./Timeline.module.css";
import TimelineSymfony from "./timeline/TimelineSymfony";
import TimelinePhp from "./timeline/TimelinePhp";
import TimelineLaravel from "./timeline/TimelineLaravel";

export default function Timeline() {
  const searchParams = useSearchParams();
  const stack = searchParams.get("s");
  return (
    <div
      className={classNames(
        "w-full ml-auto mt-4 relative border-dotted border-l-blue pt-8 | sm:pt-20 sm:border-l-2 sm:text-left md:w-1/2",
        styles.timeline
      )}
    >
      {stack === "laravel" ? <TimelineLaravel />: stack === "symfony" ? <TimelineSymfony /> : <TimelinePhp />}
    </div>
  );
}
