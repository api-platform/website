import Button from "components/common/Button";
import Logo from "components/common/Logo";
import classNames from "classnames";
import CoverCircleStacks from "./CoverCircleStacks";
import StackSelector from "./StackSelector";

export default function Cover() {
  return (
    <div className={classNames("relative bg-blue mb-16 overflow-hidden")}>
      <div className="z-50 h-20 md:h-32 absolute -bottom-px left-0 w-full bg-white clip-path-corner-left dark:bg-blue-black 2xl:-bottom-0.5" />
      <div
        className={classNames(
          "container relative h-full pt-12 pb-64 flex flex-col-reverse items-center justify-center text-white dark:text-blue-darkest | md:pb-12 md:min-h-[90vh] | lg:min-h-screen | 2xl:min-h-[1000px]"
        )}
      >
        <img
          src="/images/web.svg"
          alt=""
          width={1200}
          height={1200}
          className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 | md:left-3/4"
        />
        <div className="w-full flex h-full z-20 max-w-sm | absolute bottom-0 md:max-w-2xl md:w-3/5 md:self-end md:right-1/2 lg:w-4/5">
          <div className="object-contain object-bottom w-full h-full relative">
            <CoverCircleStacks />
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center text-center pt-12 pb-12 z-20 | md:pt-0 md:w-7/12 md:ml-auto | lg:w-1/2">
          <Logo className="w-full max-w-sm" />
          <p className="font-title text-2xl sm:text-3xl my-6 font-semibold">
            The API-first framework
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <StackSelector />
          </div>
          <Button
            color="default"
            size="extralarge"
            className="bg-blue-dark border-blue-dark mt-6 mb-4 md:mb-0 md:mt-8 "
          >
            Getting started
          </Button>
        </div>
      </div>
    </div>
  );
}
