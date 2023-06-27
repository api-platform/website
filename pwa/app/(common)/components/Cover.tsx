import Image from "next/image";
import Button from "components/common/Button";
import Logo from "components/common/Logo";
import classNames from "classnames";
import ShapeSection from "components/common/ShapeSection";

export default function Cover() {
  return (
    <ShapeSection
      effect="left-triangle"
      maskColor="white"
      darkModeColor="blue-black"
      className={classNames("bg-blue mb-16 after:h-32")}
    >
      <div
        className={classNames(
          "container relative h-full pt-12 flex flex-col-reverse items-center justify-center text-white dark:text-blue-darkest | lg:min-h-screen | 2xl:min-h-[70vh]"
        )}
      >
        <Image
          src="/images/web.svg"
          alt=""
          loading="eager"
          width={1200}
          height={1200}
          className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 | md:left-3/4"
        />
        <div className="w-full flex h-full z-20 max-w-sm | md:absolute md:bottom-12 md:max-w-2xl md:w-3/5 md:self-end md:right-1/2 md:-translate-x-[10%] | lg:translate-x-[5%] lg:w-4/5">
          <Image
            alt=""
            src="/images/zeus.svg"
            loading="eager"
            fill
            className="object-contain object-bottom !relative"
          />
        </div>
        <div className="relative w-full flex flex-col items-center text-center py-12 z-20 | md:w-7/12 md:ml-auto md:py-32 | lg:w-1/2">
          <Logo className="w-full max-w-sm" />
          <p className="font-title text-3xl my-6 font-semibold">
            The API-first framework
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <Button
              className="m-2"
              color="white"
              href="https://github.com/api-platform/api-platform/releases"
              external
            >
              Download
            </Button>
            <Button color="white" className="m-2" href="/docs/distribution/">
              Getting started
            </Button>
          </div>
        </div>
      </div>
    </ShapeSection>
  );
}
