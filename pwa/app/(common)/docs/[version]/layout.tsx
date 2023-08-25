import React from "react";
import { loadV2DocumentationNav } from "api/doc";
import { versions, current, refVersions } from "consts";
import DocLayout from "../components/DocLayout";
import { getAllDocLinks } from "api/doc/guides";

export async function generateStaticParams() {
  return versions.map((v) => ({ version: `v${v}` }));
}

export const dynamicParams = false;

async function Layout({
  params: { version },
  children,
}: {
  params: {
    version: string;
  };
  children: React.ReactNode;
}) {
  const v = versions.includes(version.substring(1))
    ? version.substring(1)
    : current;

  const v2Nav = await loadV2DocumentationNav(v);

  const guideLinks = await getAllDocLinks("guides", "guide");
  // todo: versionner les guides et les références
  const nav = refVersions.includes(v)
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
