import classNames from "classnames";
import Button from "components/common/Button";

export default async function NotFound() {
  return (
    <div
      className={classNames(
        "h-screen pt-16 bg-blue text-white flex flex-col items-center justify-center md:flex-row",
        "dark:text-blue-black"
      )}
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold">Oups...</h1>
        <p>Looks like this page doesn&apos;t exist...</p>
        <Button color="white" className="mt-4" size="medium" href="/">
          Back to home
        </Button>
      </div>
      <img
        className="max-h-[50%] md:max-h-[70%] mt-8 translate-x-[10%]"
        alt=""
        src="/images/404.svg"
      />
    </div>
  );
}
