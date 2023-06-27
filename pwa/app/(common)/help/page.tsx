import Heading from "components/common/typography/Heading";
import ShapeSection from "components/common/ShapeSection";
import Button from "components/common/Button";
import Image from "next/image";
import NavLink from "components/layout/NavLink";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`data/meta.json`);

  return {
    title: dictionary["help"].title,
    description: dictionary["help"].description,
    openGraph: {
      title: dictionary["help"].title,
      description: dictionary["help"].description,
    },
    twitter: {
      title: dictionary["help"].title,
      description: dictionary["help"].description,
    },
  };
}

export default async function Page() {
  return (
    <div className="font-light leading-relaxed">
      <ShapeSection
        className="bg-blue-black h-[75vh] z-10 after:hidden md:after:block"
        effect="right-triangle"
        maskColor="white"
        darkModeColor="blue-black"
      >
        <div className="absolute left-0 top-0 w-full h-full opacity-70 z-0">
          <Image
            src="/images/help_cover.jpg"
            fill
            className="w-full h-full object-cover object-top"
            alt=""
          />
        </div>

        <div className="container relative z-10 py-24 text-white flex flex-col justify-center min-h-full">
          <Heading size="xl" level="h1" className="pt-8">
            Need <strong>help?</strong>
          </Heading>
          <p className="mt-2 font-light text-lg max-w-xl">
            API Platform provides a variety of resources to help you get the
            most out of the framework, including community forums, commercial
            support, and training materials.
          </p>
        </div>
      </ShapeSection>
      <div className="bg-white dark:bg-blue-black after:h-12">
        <div className="container xl:max-w-5xl flex flew-row items-center relative gap-16 py-12">
          <div className="flex-1 py-6">
            <Heading size="lg" level="h2" overline="Commercial support">
              Get <strong>personalized</strong> support for your APIs
            </Heading>
            <p className="mt-4">
              <NavLink className="link " href="https://les-tilleuls.coop/en">
                Les-Tilleuls.coop
              </NavLink>{" "}
              provides commercial support services for API Platform,{" "}
              <NavLink className="link" href="https://mercure.rocks/">
                Mercure
              </NavLink>
              ,{" "}
              <NavLink className="link" href="https://vulcain.rocks/">
                Vulcain
              </NavLink>
              , and Symfony. Our experienced team offers personalized training,
              API design assistance, and development help if needed. Whether
              you&apos;re just starting out or looking to optimize your
              implementation, our professional services can help you achieve
              your goals quickly and efficiently.
            </p>
            <Button
              href="https://les-tilleuls.coop/en#contact"
              size="medium"
              className="mt-6"
            >
              Contact us
            </Button>
          </div>
          <div className="bg-white dark:bg-blue-darkest hidden shadow-md rotate-2 p-2 w-1/3 lg:w-1/2 relative aspect-[4/3] md:block">
            <Image
              width={447}
              height={281}
              alt=""
              src="/images/commercial-support.png"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <ShapeSection
        className="bg-blue-black dark:bg-blue-darkest text-white after:h-12 after:hidden md:after:block"
        effect="left-triangle"
        maskColor="white"
        darkModeColor="blue-black"
      >
        <div className="container xl:max-w-5xl flex flew-row items-center relative z-20 gap-16 pt-12 pb-8">
          <Image
            width={600}
            height={760}
            alt=""
            src="/images/community-blocks.png"
            className="hidden w-64 h-auto mx-auto md:block lg:w-80 z-20"
          />
          <div className="flex-1 max-w-lg pb-6">
            <Heading size="lg" level="h2" overline="Community support">
              The power of <strong>community</strong>
            </Heading>
            <p className="mt-4">
              Need help with API Platform? Don&apos;t worry - the community has
              got your back! With helpful developers available in forums, chat
              rooms, and other channels, you can always turn to the community
              for assistance. So don&apos;t hesitate to reach out if you need
              help - the API Platform community is here for you!
            </p>
            <Button
              href="/community"
              size="medium"
              className="mt-6"
              ariaLabel="Our community"
            >
              Learn more
            </Button>
          </div>
        </div>
      </ShapeSection>
      <div>
        <div className="container xl:max-w-5xl flex flew-row items-center relative gap-16 py-12">
          <div className="flex-1 max-w-lg py-6">
            <Heading size="lg" level="h2" overline="Training">
              Be trained by <strong>experts</strong>
            </Heading>
            <p className="mt-4">
              Be trained by the API Platform core team! Sessions available in
              English and in French. Contact Les-Tilleuls.coop to organize a
              tailored training course.
            </p>
            <Button
              external
              href="https://les-tilleuls.coop/en#contact"
              size="medium"
              className="mt-6"
            >
              Contact us
            </Button>
          </div>
          <Image
            width={800}
            height={468}
            alt=""
            src="/images/training.png"
            className="hidden w-auto h-64 mx-auto md:block lg:h-80 z-20"
          />
        </div>
      </div>
      <div className="bg-blue-extralight/50 dark:bg-blue-dark dark:text-white after:absolute after:w-full after:h-80 after:top-full after:left-0 after:bg-blue-extralight/50 after:dark:bg-blue-dark">
        <div className="container xl:max-w-5xl flex flew-row items-center relative gap-16 pt-12">
          <Image
            width={800}
            height={686}
            alt=""
            src="/images/screencasts.svg"
            className="hidden w-64 h-auto mx-auto md:block lg:w-96 z-20"
          />
          <div className="flex-1 max-w-lg py-6">
            <Heading size="lg" level="h2" overline="Screencasts">
              Master API Platform with <strong>video tutorials</strong>
            </Heading>
            <p className="mt-4">
              The easiest and funniest way to learn how to use API Platform is
              to watch the more than 60 screencasts available on SymfonyCasts!
            </p>
            <Button
              external
              href="https://symfonycasts.com/screencast/api-platform?cid=apip"
              size="medium"
              className="mt-6"
            >
              Watch courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
