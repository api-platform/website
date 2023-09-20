import React from "react";
import { versions, current, refVersions } from "consts";
import DocLayout from "../components/DocLayout";
import { getAllDocLinks } from "api/doc/guides";
import { NavPartProps } from "components/docs/DocMenu";
import { readFile } from "fs/promises";

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

  const f = await readFile(`data/docs/${v}/nav.json`, "utf8");
  const v2Nav = JSON.parse(f.toString());

  let nav: NavPartProps[] = v2Nav;

  if (refVersions.includes(v)) {
    const guideLinks = await getAllDocLinks(`guides/${v}`, "guide", ".mdx", v);
    nav = [
      ...v2Nav.slice(0, 2),
      {
        title: "Core API Reference",
        basePath: "/docs/reference",
        link:
          v === current ? "/docs/references" : `/docs/${version}/references`,
      },
      {
        title: "Core Guides",
        basePath: "/docs/guide",
        link: v === current ? "/docs/guides" : `/docs/${version}/guides`,
        links: guideLinks,
      },
      ...v2Nav.slice(2),
    ];
  }

  return <DocLayout nav={nav}>{children}</DocLayout>;
}

export default Layout;
