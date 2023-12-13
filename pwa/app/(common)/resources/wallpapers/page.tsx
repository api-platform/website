import { readdir } from "node:fs/promises";
import path from "node:path";
import { Metadata } from "next";

import Heading from "components/common/typography/Heading";
import WallpaperCard from "./components/WallpaperCard";
import OGImage from "../../../../public/images/opengraph-image.png";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["wallpapers"].title,
    description: dictionary["wallpapers"].description,
    openGraph: {
      title: dictionary["wallpapers"].title,
      description: dictionary["wallpapers"].description,
      url: "https://api-platform.com",
      type: "website",
      images: [
        {
          url: OGImage.src,
          width: 1200,
          height: 630,
          alt: "API Platform logo",
        },
      ],
    },
    twitter: {
      title: dictionary["wallpapers"].title,
      description: dictionary["wallpapers"].description,
    },
  };
}

export default async function Page() {
  const images = (
    await readdir(path.join(process.cwd(), `data/wallpapers`))
  ).map((slug: string) => path.parse(slug).name);
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
