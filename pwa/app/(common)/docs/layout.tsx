import React from "react";
import { loadV2DocumentationNav } from "api/doc";
import { versions, current } from "consts";
import DocLayout from "./components/DocLayout";
import { getAllDocLinks } from "api/doc/guides";

async function Layout({
  params: { slug },
  children,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  let version = current;

  if (slug && slug.length) {
    const slugVersion = slug[0].substring(1);
    if (versions.includes(slugVersion)) {
      version = slugVersion;
    }
  }

  const v2Nav = await loadV2DocumentationNav(version);
  const guideLinks = await getAllDocLinks("guides", "guide", ".mdx", version);

  const nav =
    version === "3.1" || version === "main"
      ? [
          ...v2Nav.slice(0, 2),
          {
            title: "Core API Reference",
            basePath: "/docs/reference",
            link: "/docs/references",
          },
          {
            title: "Core Guides",
            basePath: "/docs/guide",
            links: guideLinks,
          },
          ...v2Nav.slice(2),
        ]
      : v2Nav;

  return <DocLayout nav={nav}>{children}</DocLayout>;
}

export default Layout;
