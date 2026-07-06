import { Suspense } from "react";
import ClientGenerator from "./components/ClientGenerator";
import Cover from "./components/cover/Cover";
import Admin from "./components/Admin";
import RealTime from "./components/RealTime";
import Features from "./components/Features";
import Timeline from "./components/Timeline";
import References from "./components/References";
import { openSourceData, otherData } from "data/logos";
import Heading from "components/common/typography/Heading";

export default async function Page() {
  const ossRefs = openSourceData.filter((ref) => ref.highlight);
  const refs = otherData
    .filter((ref) => ref.highlight)
    .sort((a, b) => (a.highlight as number) - (b.highlight as number));

  return (
    <>
      <Suspense>
        <Cover />
      </Suspense>
      <section className="container text-center min-h-screen">
        <Heading size="xl" overline="API Platform Framework" level="h2">
          The <strong>easiest way</strong> to create your{" "}
          <strong>web API</strong>
        </Heading>
        <Suspense>
          <Timeline />
        </Suspense>
      </section>
      <div className="lg:mb-24">
        <ClientGenerator />
      </div>
      <Admin />
      <RealTime />
      <Features />
      <References ossRefs={ossRefs} refs={refs} />
    </>
  );
}
