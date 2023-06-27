import Button from "components/common/Button";
import Heading from "components/common/typography/Heading";
import Image from "next/image";
import Link from "components/common/Link";

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
  const logos = [
    {
      Icon: NextIcon,
      title: "Next.js",
      link: "https://nextjs.org/",
    },
    {
      Icon: NuxtIcon,
      title: "Nuxt",
      link: "https://nuxt.com/",
    },
    {
      Icon: ReactIcon,
      title: "React",
      link: "https://react.dev/",
    },
    {
      Icon: VueIcon,
      title: "Vue.js",
      link: "https://vuejs.org/",
    },
    {
      Icon: QuasarIcon,
      title: "Quasar",
      link: "https://quasar.dev/",
    },
    {
      Icon: VuetifyIcon,
      title: "Vuetify",
      link: "https://vuetifyjs.com/en/",
    },
  ];
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
            We provide a scaffolding with first-class support for{" "}
            <a
              className="link"
              href="https://nextjs.org/"
              target="_blank"
              rel="noreferer noopener"
            >
              Next.js
            </a>
            , but don&apos;t want to decide for you which front-end framework
            you want to work with so skeletons for many other frontend
            frameworks are supported such as:{" "}
            <Link
              href="/docs/create-client/nuxt/"
              prefetch={false}
              className="link"
            >
              Nuxt (Vue)
            </Link>
            ,{" "}
            <Link
              href="/docs/create-client/react-native/"
              prefetch={false}
              className="link"
            >
              Expo (React Native)
            </Link>
            ,{" "}
            <Link
              href="/docs/create-client/Quasar/"
              prefetch={false}
              className="link"
            >
              Quasar
            </Link>
            , and{" "}
            <Link
              href="/docs/create-client/#generated-react-and-react-native-apps-updated-in-real-time"
              prefetch={false}
              className="link"
            >
              many more...
            </Link>
          </p>
          <div className="flex flex-row py-8 text-blue | sm:w-1/2 | md:w-full">
            {logos.map((logo) => (
              <a
                key={logo.title}
                href={logo.link}
                title={logo.title}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:brightness-125 transition-all"
              >
                <logo.Icon className="m-2 h-10 w-auto" />
              </a>
            ))}
          </div>
          <Button
            empty
            href="/docs/create-client"
            ariaLabel="See our managed clients"
          >
            Learn more
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
