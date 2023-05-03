import Heading from "components/common/typography/Heading";
import fs from "fs";
import path from "path";
import WallpaperCard from "./components/WallpaperCard";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`i18n/meta/en.json`);

  return {
    title: dictionary["wallpapers"].title,
    description: dictionary["wallpapers"].description,
  };
}

export default async function Page() {
  const images = await fs
    .readdirSync(path.join(process.cwd(), `data/wallpapers`))
    .map((slug: string) => path.parse(slug).name);
  return (
    <div className="pt-16">
      <div className="bg-blue py-12 text-white dark:text-blue-black">
        <div className="container text-center">
          <Heading size="xl" level="h1">
            Our <strong>wallpapers</strong>
          </Heading>
        </div>
      </div>
      <div className="container py-8">
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,350px)] w-full place-content-center">
          {images.map((image) => (
            <WallpaperCard key={image} imageName={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
