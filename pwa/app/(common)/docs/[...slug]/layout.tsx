import React from "react";
import { loadV2DocumentationNav } from "api/doc";
import { versions, current } from "consts";
import DocLayout from "../components/DocLayout";

async function Layout({
  params: { slug },
  children,
}: {
  params: {
    slug: string[];
  };
  children: React.ReactNode;
}) {
  const version = versions.includes(slug[0].substring(1))
    ? slug[0].substring(1)
    : current;
  const nav = await loadV2DocumentationNav(version);

  return <DocLayout nav={nav}>{children}</DocLayout>;
}

export default Layout;
