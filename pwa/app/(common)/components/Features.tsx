"use client";
import Heading from "components/common/typography/Heading";
import * as icons from "components/icons/features";
import FeatureItem from "./FeatureItem";
import Link from "components/common/Link";

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
            <Link className="link" href="/docs/core/security/" prefetch={false}>
              Authentication and access control rules
            </Link>
          </FeatureItem>
          <FeatureItem Icon={icons.ValidationIcon} index={1}>
            <Link
              className="link"
              href="/docs/core/validation/"
              prefetch={false}
            >
              Advanced data validation
            </Link>
          </FeatureItem>
          <FeatureItem Icon={icons.CacheIcon} index={2}>
            <Link
              className="link"
              href="/docs/core/performance/"
              prefetch={false}
            >
              Invalidation-based HTTP cache
            </Link>
          </FeatureItem>
          <FeatureItem Icon={icons.AsynchronousIcon} index={3}>
            Asynchronous state processing
          </FeatureItem>
          <FeatureItem Icon={icons.VulcainIcon} index={4}>
            <a
              className="link"
              href="https://vulcain.rocks"
              target="_blank"
              rel="noreferer noopener"
            >
              Relation preloading avec Vulcain.rocks
            </a>
          </FeatureItem>
          <FeatureItem Icon={icons.CaddyIcon} index={5}>
            Caddy server integration HTTPS & HTTP/3
          </FeatureItem>
          <FeatureItem Icon={icons.PaginationIcon} index={6}>
            Automatic pagination and filtering
          </FeatureItem>
          <FeatureItem Icon={icons.DockerIcon} index={7}>
            <Link className="link" href="/docs/deployment/" prefetch={false}>
              Docker & Kubernetes setups included
            </Link>
          </FeatureItem>
        </div>
      </div>
    </section>
  );
}
