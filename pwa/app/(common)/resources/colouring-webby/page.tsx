import { readdir } from "node:fs/promises";
import path from "node:path";
import { Metadata } from "next";
import ColouringList from "./components/ColouringList";
import Heading from "components/common/typography/Heading";
import Image from "next/image";
import OGImage from "../../../../public/images/opengraph-image.png";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["colouring"].title,
    description: dictionary["colouring"].description,
    openGraph: {
      title: dictionary["colouring"].title,
      description: dictionary["colouring"].description,
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
    <section className="pt-16 bg-gray-100 dark:bg-blue-black after:absolute after:w-full after:h-80 after:top-full after:left-0 after:bg-gray-100 after:dark:bg-blue-black">
      <div className="bg-blue py-8 text-white dark:text-blue-black">
        <div className="container relative z-10 text-white flex flex-row gap-8 justify-center items-center min-h-full">
          <div className="text-center">
            <Heading size="xl" level="h1">
              <strong>Colouring</strong> webby
            </Heading>
            <p className="mt-4 font-light text-md max-w-xl">
              It’s time to pull out your colored pencils! Coloring is a great
              way to kill time and relax. Coloring is not just for kids. It
              improves focus and goes beyond being a great activity for
              destress.
            </p>
            <p className="text-md pt-5 font-light max-w-xl">
              You (or your kids) get bored? Download our coloring pages and
              share your work by mentioning{" "}
              <a
                className="font-semibold"
                href="https://twitter.com/ApiPlatform"
                target="_blank"
                rel="noopener noreferrer"
              >
                API Platform on Twitter
              </a>
              !
            </p>
          </div>
          <Image
            className="w-[400px] hidden | lg:block lg:translate-y-16"
            width={300}
            height={300}
            src="/images/painter.svg"
            alt="painter"
          />
        </div>
      </div>
      <ColouringList images={images} />
    </section>
  );
}
