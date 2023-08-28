import { getReferencesSummary } from "api/doc/references";
import ReferenceSummaryPage from "./ReferenceSummaryPage";

export default async function Page({
  params: { version },
}: {
  params: {
    version: string;
  };
}) {
  const summary = await getReferencesSummary(version);

  return <ReferenceSummaryPage summary={summary} />;
}
