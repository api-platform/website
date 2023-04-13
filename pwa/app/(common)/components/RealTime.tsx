import Button from "components/common/Button";
import Heading from "components/common/typography/Heading";
import Image from "next/image";

export default function RealTime() {
  return (
    <section className="py-12">
      <div className="container flex flex-col items-center | sm:flex-row-reverse | md:flex-row">
        <div className="flex-1 text-center relative | sm:text-left">
          <Heading size="xl" overline="Mercure.rocks" level="h2">
            Go <strong>real time</strong>
          </Heading>
          <Image
            src="/images/mercure.png"
            alt=""
            width={150}
            height={150}
            className="object-contain mx-auto mt-8 sm:hidden"
          />
          <p className="text-text-secondary dark:text-white text-xl font-light mt-8">
            API Platform automatically leverages the Mercure protocol to send
            updates made to your resources to all the connected clients. Updates
            are automatically broadcasted by the API component. The admin and
            all the generated client skeletons are also natively able to receive
            the event and update the UI automatically.
          </p>
          <Button className="mt-8" empty>
            Learn more
          </Button>
        </div>
        <div className="hidden relative mt-4 aspect-[3/4] w-1/3 mr-8 | sm:block | md:mr-0 md:w-2/5 md:aspect-square">
          <Image
            src="/images/mercure.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
