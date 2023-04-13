"use client";
import { useContext, PropsWithChildren } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { SectionsContext } from "components/con/home/Section";
import ConLink from "components/con/common/ConLink";

interface NavLinkProps extends PropsWithChildren {
  to: string;
}

export default function NavLink({ to, children }: NavLinkProps) {
  const pathname = usePathname() || "";
  const { sectionsVisibles } = useContext(SectionsContext);
  const currentSection = sectionsVisibles?.[0];

  const normalizedUrl = (url = "") => {
    const linkPathname = url.split("#")[0] || "";
    const anchor = url.split("#")[1];
    return {
      pathname: linkPathname.replace(/\/$/, ""),
      anchor,
    };
  };
  const { pathname: currentPathname } = normalizedUrl(pathname);
  const { pathname: linkPathname, anchor } = normalizedUrl(to);

  const isActive =
    currentPathname === linkPathname && (currentSection === anchor || !anchor);

  return (
    <div
      className={classNames(
        "inline-block relative uppercase font-semibold text-sm mx-2 transition-all hover:text-blue hover:scale-95 after:absolute after:h-1 after:left-1/2 after:-translate-x-1/2 after:top-[calc(100%+4px)] after:transition-all after:bg-blue after:rounded-md",
        isActive ? "text-blue after:w-5" : "text-white after:w-0"
      )}
    >
      <ConLink href={to}>{children}</ConLink>
    </div>
  );
}
