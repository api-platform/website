import React from "react";
import { loadV2DocumentationNav } from "api/doc";
import { versions, current, refVersions } from "consts";
import DocLayout from "../components/DocLayout";
import { getAllDocLinks } from "api/doc/guides";
import { NavPartProps } from "components/docs/DocMenu";

export async function generateStaticParams() {
  return versions.map((v) => ({ version: `v${v}` }));
}
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

  let nav: NavPartProps[] = await loadV2DocumentationNav(v);
  if (refVersions.includes(v)) {
    const guideLinks = await getAllDocLinks(`guides/${v}`, "guide", ".mdx", v);
    nav = [
      ...nav.slice(0, 2),
      {
        title: "Core API Reference",
        basePath: "/docs/reference",
        link: `/docs/${version}/references`,
      },
      {
        title: "Core Guides",
        basePath: "/docs/guide",
        links: guideLinks,
      },
      ...nav.slice(2),
    ];
  }

  return <DocLayout nav={nav}>{children}</DocLayout>;
}

export default Layout;
