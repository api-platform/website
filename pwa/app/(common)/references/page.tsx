import { Metadata } from "next";
import Heading from "components/common/typography/Heading";
import { openSourceData, otherData } from "data/logos";
import Image from "next/image";
import classNames from "classnames";
import OGImage from "../../../public/images/opengraph-image.png";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["references"].title,
    description: dictionary["references"].description,
    openGraph: {
      title: dictionary["references"].title,
      description: dictionary["references"].description,
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
      title: dictionary["references"].title,
      description: dictionary["references"].description,
    },
  };
}

export default async function Page() {
  return (
    <div className="pt-16">
      <div className="bg-blue py-12 text-white dark:text-blue-black">
        <div className="container text-left">
          <Heading size="xl" level="h1">
            They use <strong>API Platform</strong>
          </Heading>
        </div>
      </div>
      <div className="container pt-4">
        <div className="mb-6">
          <Heading
            level="h2"
            size="lg"
            className="w-full border-b-2 border-b-blue mb-4"
          >
            Free software
          </Heading>
        </div>
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] w-full place-content-center">
          {openSourceData.map((ref) => (
            <a
              key={ref.name}
              href={ref.link}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames(
                "border border-solid p-5 border-blue-extralight dark:border-blue-dark opacity-75 transition-all cursor-pointer w-full flex flex-col justify-center items-center group text-center hover:opacity-100 hover:shadow-xl hover:bg-blue/10 hover:scale-105"
              )}
            >
              <div className="relative aspect-square w-full grayscale brithgness-100 group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:grayscale dark:contrast-150 dark:brightness-50 dark:invert transition-all">
                <Image
                  alt={ref.name}
                  src={`/images/references/oss/${ref.logo}.png`}
                  height={50}
                  width={200}
                  className="object-contain object-center w-full h-full"
                />
              </div>
              <p className="text-md leading-none font-title">{ref.name}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="container py-12">
        <div className="mb-2">
          <Heading
            level="h2"
            size="lg"
            className="w-full border-b-2 border-b-blue mb-4"
          >
            Companies
          </Heading>
        </div>
        <div className="flex flex-row flex-wrap">
          {otherData.map((ref) => (
            <a
              key={ref.name}
              href={ref.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-1/2 p-5 opacity-75 grayscale hover:grayscale-0 brithgness-100 transition-all cursor-pointer | sm:w-1/3 | md:w-1/4 | lg:w-1/6 | hover:opacity-100 | dark:hover:grayscale dark:contrast-150 dark:brightness-50 dark:invert"
            >
              <Image
                alt={ref.name}
                src={`/images/references/${ref.logo}.png`}
                height={50}
                width={200}
                className="max-w-[120px] mx-auto"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
