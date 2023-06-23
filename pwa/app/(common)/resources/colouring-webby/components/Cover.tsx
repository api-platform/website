import Heading from "components/common/typography/Heading";
import Image from "next/image";
import Link from "components/common/Link";

export default function Cover() {
  return (
    <div className="bg-blue text-white | dark:text-blue-black">
      <div className="container flex items-center pb-20 | xl:max-w-5xl">
        <Image
          className="w-1/3 hidden | md:block"
          width={300}
          height={300}
          src="/images/painter.svg"
          alt="painter"
        />
        <div className="text-center | md:pl-5">
          <Heading size="xl" level="h1" className="mt-5 mb-2.5">
            <strong>Colouring</strong> Webby
          </Heading>
          <p className="text-lg">
            It’s time to pull out your colored pencils! Coloring is a great way
            to kill time and relax. Coloring is not just for kids. It improves
            focus and goes beyond being a great activity for destress.
          </p>
          <p className="text-lg pt-5">
            You (or your kids) get bored? Download our coloring pages and share
            your work by mentioning API Platform on Twitter!
            <Link
              className="font-semibold"
              href="https://twitter.com/ApiPlatform"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Platform on Twitter
            </Link>
            !
          </p>
        </div>
      </div>
    </div>
  );
}
