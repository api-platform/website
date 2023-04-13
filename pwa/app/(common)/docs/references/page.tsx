import { getReferencesSummary } from "api/doc/references";
import ReferenceSummaryPage from "./ReferenceSummaryPage";

export default async function Page() {
  const summary = await getReferencesSummary();

  return <ReferenceSummaryPage summary={summary} />;
}
