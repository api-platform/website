"use client";
import { useCallback, PropsWithChildren, useContext } from "react";
import { usePathname } from "next/navigation";
import useDynamicRefs from "hooks/con/useDynamicRefs";
import Link from "components/common/Link";
import { LanguageContext } from "contexts/con/LanguageContext";

interface ConLinkProps extends PropsWithChildren {
  href?: string;
  className?: string;
}

export default function ConLink({
  href: link,
  children,
  className,
}: ConLinkProps) {
  const pathname = usePathname() || "";
  const { locale } = useContext(LanguageContext);
  const href = link?.replace("{{locale}}", locale);

  const [getRef] = useDynamicRefs();

  const goToAnchorLink = useCallback(
    (section: string) => {
      if (!section) {
        window.document.scrollingElement?.scrollTo(0, 0);
        return;
      }
      const element = getRef(`section-${section}`);
      element?.current?.scrollIntoView({ behavior: "smooth" });
    },
    [getRef]
  );

  const normalizedUrl = (url = "") => {
    const linkPathname = url.split("#")[0] || "";
    const anchor = url.split("#")[1];
    return {
      pathname: linkPathname.replace(/\/$/, ""),
      anchor,
    };
  };
  const { pathname: currentPathname } = normalizedUrl(pathname);
  const { pathname: linkPathname, anchor } = normalizedUrl(href);

  return currentPathname == linkPathname ? (
    <div
      className={className}
      onClick={() => goToAnchorLink(anchor)}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  ) : anchor ? (
    <a className={className} href={href}>
      {children}
    </a>
  ) : (
    <Link className={className} href={href || ""}>
      {children}
    </Link>
  );
}
