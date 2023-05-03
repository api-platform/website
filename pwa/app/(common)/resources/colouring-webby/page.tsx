import ColouringList from "./components/ColouringList";
import Cover from "./components/Cover";
import fs from "fs";
import path from "path";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`i18n/meta/en.json`);

  return {
    title: dictionary["colouring"].title,
    description: dictionary["colouring"].description,
  };
}

export default async function Page() {
  const images = await fs
    .readdirSync(`public/images/colouring/mini`)
    .filter((filename: string) => path.parse(filename).ext === ".jpg")
    .map((filename: string) => path.parse(filename).name);
  return (
    <section className="pt-16">
      <Cover />
      <ColouringList images={images} />
    </section>
  );
}
