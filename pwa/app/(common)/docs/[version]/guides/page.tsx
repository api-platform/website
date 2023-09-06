import BreadCrumbs from "components/docs/BreadCrumbs";
import { refVersions } from "consts";

export async function generateStaticParams() {
  return refVersions.map(version => ({ version }));
}

export const dynamicParams = false;

export default async function Page() {
  return (
    <>
      {" "}
      <BreadCrumbs breadCrumbs={[{ title: "Guides" }]} />
      <h1>Guides</h1>
    </>
  );
}
