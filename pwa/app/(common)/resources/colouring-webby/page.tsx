import { readdir } from "node:fs/promises";
import path from "path";
import { Metadata } from "next";
import ColouringList from "./components/ColouringList";
import Cover from "./components/Cover";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["colouring"].title,
    description: dictionary["colouring"].description,
    openGraph: {
      title: dictionary["colouring"].title,
      description: dictionary["colouring"].description,
    },
    twitter: {
      title: dictionary["colouring"].title,
      description: dictionary["colouring"].description,
    },
  };
}

export default async function Page() {
  const images = (await readdir(`public/images/colouring/mini`))
    .filter((filename: string) => path.parse(filename).ext === ".jpg")
    .map((filename: string) => path.parse(filename).name);
  return (
    <section className="pt-16">
      <Cover />
      <ColouringList images={images} />
    </section>
  );
}
