import BreadCrumbs from "components/docs/BreadCrumbs";

export default async function Page() {
  return (
    <>
      {" "}
      <BreadCrumbs breadCrumbs={[{ title: "Guides" }]} />
      <h1>Guides</h1>
    </>
  );
}
