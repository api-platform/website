import Button from "components/common/Button";
import Heading from "components/common/typography/Heading";
import Image from "next/image";
import { Reference } from "types";
import LogoItem from "./ReferenceLogoItem";

interface ReferencesProps {
  ossRefs: Reference[];
  refs: Reference[];
}

export default function References({ refs, ossRefs }: ReferencesProps) {
  const half = Math.ceil(ossRefs.length / 2);

  const firstHalf = ossRefs.slice(0, half);
  const secondHalf = ossRefs.slice(half);

  return (
    <section className="py-12 overflow-hidden">
      <div className="container text-center">
        <Heading size="xl" overline="References" level="h2">
          They <strong>use</strong> API Platform
        </Heading>
        <div className="relative py-12 flex flex-row items-center justify-center pointer-events-none">
          <Image
            src="/images/web.svg"
            alt=""
            width={1000}
            height={1000}
            className="absolute z-0 top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-75 | sm:left-1/3 | lg:left-1/2"
          />
          <div className="hidden flex-1 justify-center items-end flex-col pr-12 | lg:flex">
            {firstHalf.map((ref, index) => (
              <LogoItem
                key={ref.name}
                direction="left"
                count={firstHalf.length}
                currentIndex={index}
                reference={ref}
              />
            ))}
          </div>
          <div className="p-3 shadow-2xl rounded-full bg-blue -rotate-90 inline-flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 | sm:relative sm:translate-y-0 sm:translate-x-0 sm:rotate-0 | md:p-4 z-20">
            <div className="bg-white dark:bg-blue-black flex items-end justify-center uppercase font-bold text-xl p-8 text-blue text-center shadow-md w-48 aspect-square rounded-full | sm:text-2xl sm:items-center">
              <span className="leading-none">Open source</span>
            </div>
          </div>
          <div className="hidden w-1/2 flex-1 flex-wrap basis-0 justify-center items-start flex-col pl-12 | lg:flex">
            {secondHalf.map((ref, index) => (
              <LogoItem
                key={ref.name}
                direction="right"
                count={secondHalf.length}
                currentIndex={index}
                reference={ref}
              />
            ))}
          </div>
          <div className="justify-start items-start flex flex-col pl-8 | md:pl-12 | lg:hidden">
            {ossRefs.map((ref, index) => (
              <LogoItem
                key={ref.name}
                direction="right"
                count={ossRefs.length}
                currentIndex={index}
                reference={ref}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row flex-wrap py-12">
          {refs.map((ref) => (
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
        <Button empty href="/references">
          See all our references
        </Button>
      </div>
    </section>
  );
}
