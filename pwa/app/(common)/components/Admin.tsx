import Button from "components/common/Button";
import Heading from "components/common/typography/Heading";
import Image from "next/image";
import ListPoint from "./AdminListPoint";
import Link from "components/common/Link";

export default function Admin() {
  return (
    <section className="pt-24">
      <div className="container relative z-10 flex flex-col items-center py-12 text-center -mb-12">
        <Heading size="xl" overline="API Platform admin" level="h2">
          Enjoy a beautiful <strong>B2B interface</strong>
        </Heading>
        <p className="text-text-secondary dark:text-white text-xl font-light mt-8">
          API Platform Admin exposes your data trough a beautiful UI.
        </p>
        <div className="flex flex-col w-full justify-between items-center py-8 gap-y-8 | sm:flex-row sm:max-w-xl sm:gap-x-24 sm:gap-y-0 sm:mt-8 | md:max-w-none | xl:min-h-[450px]">
          <div className="flex flex-col items-center text-center w-full | sm:items-start sm:text-left | lg:w-1/4">
            <ListPoint direction="left">
              Entirely <strong>customizable</strong>
            </ListPoint>
            <ListPoint direction="left">
              <strong>Hydra</strong> and{" "}
              <Link
                href="/docs/admin/openapi/"
                prefetch={false}
                className="link"
              >
                <strong>OpenAPI</strong>
              </Link>{" "}
              compatible
            </ListPoint>
            <ListPoint direction="left">
              Built on top of <strong>Material UI</strong> and{" "}
              <strong>React Admin</strong>
            </ListPoint>
          </div>
          <div className="flex flex-col items-center text-center w-full | sm:items-start sm:text-left | lg:w-1/4">
            <ListPoint direction="right">
              100% <strong>no code</strong>
            </ListPoint>
            <ListPoint direction="right">
              Automatic <strong>API discovery</strong>
            </ListPoint>
          </div>
        </div>
        <div className="w-full max-w-md -mb-12 | lg:mb-0 lg:max-w-none lg:w-1/2 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2">
          <Image
            src="/images/admin.svg"
            width={400}
            height={400}
            className="w-full h-auto md:scale-110 -translate-x-[5%]"
            alt=""
          />
        </div>
      </div>
      <div className="w-full relative z-0 pt-24 pb-12 text-center before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:scale-x-150 before:bg-blue before:rounded-t-[100%] before:w-full before:h-full dark:before:bg-blue-dark">
        <Button
          empty
          className="relative dark:border-blue-extralight dark:text-blue-extralight"
          color="white"
          href="/docs/admin/"
          ariaLabel="See admin interface"
        >
          Learn more
        </Button>
      </div>
    </section>
  );
}
