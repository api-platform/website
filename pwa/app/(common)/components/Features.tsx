"use client";
import Heading from "components/common/typography/Heading";
import * as icons from "components/icons/features";
import FeatureItem from "./FeatureItem";

export default function Features() {
  return (
    <section className="py-12 bg-blue-black dark:bg-blue-darkest">
      <div className="container text-center">
        <Heading
          size="xl"
          overline="More features"
          level="h2"
          className="text-white"
        >
          Going <strong>further</strong>
        </Heading>
        <div className="w-full max-w-6xl mx-auto pt-12 flex flex-row flex-wrap justify-center">
          <FeatureItem Icon={icons.AuthenticationIcon} index={0}>
            Authentication and access control rules
          </FeatureItem>
          <FeatureItem Icon={icons.ValidationIcon} index={1}>
            Advanced data validation
          </FeatureItem>
          <FeatureItem Icon={icons.CacheIcon} index={2}>
            Invalidation-based HTTP cache
          </FeatureItem>
          <FeatureItem Icon={icons.AsynchronousIcon} index={3}>
            Asynchronous state processing
          </FeatureItem>
          <FeatureItem Icon={icons.VulcainIcon} index={4}>
            Relation preloading avec Vulcain.rocks
          </FeatureItem>
          <FeatureItem Icon={icons.CaddyIcon} index={5}>
            Caddy server integration HTTPS & HTTP/3
          </FeatureItem>
          <FeatureItem Icon={icons.PaginationIcon} index={6}>
            Automatic pagination and filtering
          </FeatureItem>
          <FeatureItem Icon={icons.DockerIcon} index={7}>
            Docker & Kubernetes setups included
          </FeatureItem>
        </div>
      </div>
    </section>
  );
}
