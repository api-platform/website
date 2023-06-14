import React from "react";
import { getAllDocLinks } from "api/doc/guides";
import DocLayout from "../components/DocLayout";

async function Layout({ children }: { children: React.ReactNode }) {
  const guideLinks = await getAllDocLinks("guides", "guide");
  const tutorialLinks = await getAllDocLinks("tutorial");
  const inDepthLinks = await getAllDocLinks("in-depth");

  const docMenuparts = [
    {
      title: "Guides",
      basePath: "/docs/guide",
      links: guideLinks,
    },
    {
      title: "References",
      basePath: "/docs/reference",
      link: "/docs/references",
      links: [],
    },
    {
      title: "Tutorials",
      basePath: "/docs/tutorial",
      links: tutorialLinks,
    },
    {
      title: "In depth",
      basePath: "/docs/in-depth",
      links: inDepthLinks,
    },
  ];

  return <DocLayout nav={docMenuparts}>{children}</DocLayout>;
}

export default Layout;
