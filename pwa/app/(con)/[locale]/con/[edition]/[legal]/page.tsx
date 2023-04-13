import { getAllLegalSlugs, getLegalData } from "api/con/legal";
import LegalPage from "./LegalPage";

export async function generateStaticParams({
  params: { edition },
}: {
  params: { edition: string };
}) {
  const slugs = await getAllLegalSlugs(edition);

  return slugs.map((legal: string) => ({
    legal,
  }));
}

export default async function Page({
  params,
}: {
  params: {
    edition: string;
    legal: string;
  };
}) {
  const legalData = await getLegalData(params.edition, params.legal);

  return <LegalPage title={legalData.title} content={legalData.content} />;
}
