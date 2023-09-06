import { getReferencesSummary } from "api/doc/references";
import ReferenceSummaryPage from "./ReferenceSummaryPage";
import { current, versions } from "consts";

import { refVersions } from "consts";

export async function generateStaticParams() {
  return refVersions.map((version) => ({ version }));
}

export const dynamicParams = false;

export default async function Page({
  params: { version },
}: {
  params: {
    version: string;
  };
}) {
  const v = versions.includes(version.substring(1))
    ? version.substring(1)
    : current;

  const summary = await getReferencesSummary(v);

  return <ReferenceSummaryPage summary={summary} />;
}
