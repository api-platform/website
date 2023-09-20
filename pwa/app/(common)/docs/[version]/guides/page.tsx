import {current, refVersions, versions} from "consts";
import GuideSummaryPage from "./GuideSummaryPage";
import { getAllDocLinks } from "api/doc/guides";

export async function generateStaticParams() {
  return refVersions.map((version) => ({ version: `v${version}` }));
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

  const guides = await getAllDocLinks(`guides/${v}`, "guide", ".mdx", v);

  return <GuideSummaryPage guides={guides} />;
}
