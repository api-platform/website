import { readdir } from "node:fs/promises";
import path from "node:path";
import { Metadata } from "next";
import Heading from "components/common/typography/Heading";
import LogoCard from "./components/LogoCard";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["logos"].title,
    description: dictionary["logos"].description,
    openGraph: {
      title: dictionary["logos"].title,
      description: dictionary["logos"].description,
    },
    twitter: {
      title: dictionary["logos"].title,
      description: dictionary["logos"].description,
    },
  };
}

export default async function Page() {
  const images = (await readdir(`public/images/logos`))
    .filter((filename: string) => path.parse(filename).ext === ".svg")
    .map((filename: string) => path.parse(filename).name);

  return (
    <div className="pt-16">
      <div className="bg-blue py-12 text-white dark:text-blue-black">
        <div className="container text-center">
          <Heading size="xl" level="h1">
            Identity and <strong>logos</strong>
          </Heading>
          <p className="font-light text-lg mt-4">
            Before using the API Platform logos, read our Trademark and Logo
            Policy.
          </p>
        </div>
      </div>
      <div className="container py-8">
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,350px)] w-full place-content-center">
          {images.map((image) => (
            <LogoCard key={image} imageName={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
