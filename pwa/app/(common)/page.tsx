import ClientGenerator from "./components/ClientGenerator";
import Cover from "./components/Cover";
import Admin from "./components/Admin";
import RealTime from "./components/RealTime";
import Features from "./components/Features";
import Timeline from "./components/Timeline";
import References from "./components/References";
import { openSourceData, otherData } from "data/logos";
import Heading from "components/common/typography/Heading";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await import(`i18n/meta/en.json`);

  return {
    title: dictionary["homepage"].title,
    description: dictionary["homepage"].description,
  };
}

export default async function Page() {
  const ossRefs = openSourceData.filter((ref) => ref.highlight);
  const refs = otherData.filter((ref) => ref.highlight);

  return (
    <>
      <Cover />
      <section className="container text-center min-h-screen">
        <Heading size="xl" overline="API Platform Framework" level="h2">
          The <strong>easiest way</strong> to create your{" "}
          <strong>web API</strong>
        </Heading>
        <Timeline />
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
