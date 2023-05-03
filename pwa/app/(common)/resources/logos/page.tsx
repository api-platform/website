import Heading from "components/common/typography/Heading";
import fs from "fs";
import path from "path";
import LogoCard from "./components/LogoCard";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`i18n/meta/en.json`);

  return {
    title: dictionary["logos"].title,
    description: dictionary["logos"].description,
  };
}

export default async function Page() {
  const images = await fs
    .readdirSync(`public/images/logos`)
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
