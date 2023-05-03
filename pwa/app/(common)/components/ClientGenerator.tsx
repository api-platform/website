import Button from "components/common/Button";
import Heading from "components/common/typography/Heading";
import Image from "next/image";
import {
  VueIcon,
  NextIcon,
  QuasarIcon,
  VuetifyIcon,
  ReactIcon,
  NuxtIcon,
} from "components/icons/technologies";
import ShapeSection from "components/common/ShapeSection";

export default function ClientGenerator() {
  return (
    <ShapeSection
      maskColor="white"
      darkModeColor="blue-black"
      effect="right-triangle"
      className="bg-blue-black dark:bg-blue-darkest"
    >
      <div className="container flex flex-col items-center relative py-12 | lg:items-stretch lg:flex-row-reverse">
        <div className="flex flex-col items-center text-center pt-12 | sm:pb-24 sm:items-start sm:text-left | lg:flex-1">
          <Heading
            size="xl"
            className="text-white"
            overline="Client generator"
            level="h2"
          >
            Scaffold <strong>client apps</strong>
          </Heading>
          <p className="text-white/60 text-xl font-light mt-8">
            We don&apos;t want to decide for you which front-end framework you
            want to work with. That&apos;s why we allow you to generate a web or
            mobile application for most popular front-end frameworks, like Vue,
            React, or Quasar.
          </p>
          <div className="flex flex-row py-8 text-blue | sm:w-1/2 | md:w-full">
            <NextIcon className="m-2 h-10 w-auto" />
            <NuxtIcon className="m-2 h-10 w-auto" />
            <ReactIcon className="m-2 h-10 w-auto" />
            <VueIcon className="m-2 h-10 w-auto" />
            <QuasarIcon className="m-2 h-10 w-auto" />
            <VuetifyIcon className="m-2 h-10 w-auto" />
          </div>
          <Button empty href="/docs">
            See our managed clients
          </Button>
        </div>
        <div className="relative z-20 w-96 max-w-full -mb-10 | sm:absolute sm:w-1/2 sm:bottom-0 sm:right-0 | lg:right-auto lg:bottom-auto lg:relative lg:h-auto lg:w-1/2 lg:translate-y-28">
          <Image
            alt=""
            width={600}
            height={600}
            src="/images/wheel.png"
            className=" w-full | lg:absolute lg:bottom-0 lg:min-w-[600px] lg:right-0"
          />
          <Image
            alt=""
            width={300}
            height={300}
            src="/images/spider-hat.svg"
            className="absolute w-5/12 bottom-0 translate-y-12 -rotate-12 left-0 -translate-x-3"
          />
        </div>
      </div>
    </ShapeSection>
  );
}
