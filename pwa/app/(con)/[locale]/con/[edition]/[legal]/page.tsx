import { getAllLegalSlugs, getLegalData } from "api/con/legal";
import LegalPage from "./LegalPage";
import { Metadata } from "next";

type Props = {
  params: { legal: string; edition: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legal, edition } = params;
  const legalData = await getLegalData(edition, legal);

  return {
    title: legalData.title,
    openGraph: {
      title: `API Platform Conference ${edition} | ${legalData.title}`,
    },
    twitter: {
      title: `API Platform Conference ${edition} | ${legalData.title}`,
    },
  };
}

export async function generateStaticParams({ params: { edition } }: Props) {
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
