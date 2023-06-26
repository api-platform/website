import Logo from "components/common/Logo";
import { Github, Mastodon, Twitter } from "components/icons/social";
import footerData from "data/footer";
import Link, { LinkProps } from "components/common/Link";
import Image from "next/image";
import { PropsWithChildren } from "react";

function FooterLink(props: LinkProps & PropsWithChildren) {
  const externalProps = props.href.toString()?.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Link
      prefetch={false}
      {...props}
      className="text-white font-light transition-all hover:opacity-75"
      {...externalProps}
    >
      {props.children}
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="bg-blue-black text-white border-t-2 border-t-blue-black dark:border-t-blue-dark">
      <div className="container py-12">
        <div className="flex flex-row justify-center | sm:justify-between">
          <div className="text-xs font-light text-center | sm:text-left">
            <Logo className="h-8 text-blue" inline />
            <p className="mt-4">
              Copyright © 2023{" "}
              <a
                className="link text-blue-light"
                href="https://dunglas.dev/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Kévin Dunglas
              </a>
            </p>
            <p>
              Sponsored by{" "}
              <a
                className="link text-blue-light"
                href="https://les-tilleuls.coop/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Les-Tilleuls.coop
              </a>
            </p>
          </div>
          <div className="hidden text-blue-light flex-row gap-4 | sm:flex">
            <a
              href="https://github.com/api-platform/api-platform"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://fosstodon.org/@ApiPlatform"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Mastodon className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/ApiPlatform"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-12 items-center | sm:items-start sm:flex-row">
          <div className="flex flex-1 flex-wrap flex-col | sm:flex-row">
            {footerData.map((footerPart) => (
              <div
                key={footerPart.title}
                className="flex flex-col flex-wrap flex-1 gap-2 min-w-[200px] mb-16 items-center | sm:mb-8 sm:items-start"
              >
                {footerPart.link ? (
                  <Link
                    prefetch={false}
                    className="uppercase font-title text-blue-light font-semibold mb-1 text-xl"
                    href={footerPart.link}
                  >
                    {footerPart.title}
                  </Link>
                ) : (
                  <p className="uppercase font-title text-blue-light font-semibold mb-1 text-xl">
                    {footerPart.title}
                  </p>
                )}
                {footerPart.links.map((link) => (
                  <FooterLink key={link.title} href={link.url}>
                    {link.title}
                  </FooterLink>
                ))}
              </div>
            ))}
          </div>
          <div className="relative w-1/2 aspect-[4/3] | sm:w-1/3 sm:ml-4">
            <Image
              alt=""
              src="/images/super-webby.svg"
              fill
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="border-t-2 border-t-blue-dark mt-12 pt-6 text-xs font-light flex flex-col items-center justify-center flex-wrap gap-4 |  lg:flex-row lg:justify-between">
          <p>
            Code licensed under{" "}
            <a
              className="link text-blue-light"
              href="https://github.com/api-platform/api-platform/blob/main/LICENSE"
              rel="noopener noreferrer"
              target="_blank"
            >
              MIT
            </a>
            , documentation under{" "}
            <a
              className="link text-blue-light"
              href="https://creativecommons.org/licenses/by/3.0/"
              rel="noopener noreferrer"
              target="_blank"
            >
              CC by 3.0
            </a>
          </p>
          <div className="flex flex-col gap-2 text-center text-sm | sm:flex-row sm:gap-8">
            <FooterLink href="/docs/extra/enterprise">
              Enterprise subscription
            </FooterLink>
            <FooterLink href="/docs/extra/security-policy">
              Security Policy
            </FooterLink>
            <FooterLink href="/trademark-policy">Trademark Policy</FooterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
