// @ts-check

import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import nextMDX from "@next/mdx";
import { visit } from "unist-util-visit";

function transformCustomLinks() {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (
                node.tagName === "span" &&
                node.children.length === 1 &&
                node.children[0].type === "text"
            ) {
                const text = node.children[0].value.trim();
                const linkMatch = text.match(
                    /`<a href="\/(\S+)">([^\s<]+)<\/a>`/
                );
                if (linkMatch) {
                    const [, linkHref, linkText] = linkMatch;
                    const linkNode = {
                        type: "element",
                        tagName: "a",
                        properties: { href: linkHref },
                        children: [{ type: "text", value: linkText }],
                    };
                    Object.assign(node, linkNode);
                }
            } else if (
                node.tagName === "code" &&
                node.children.length === 1 &&
                node.children[0].type === "text"
            ) {
                const text = node.children[0].value.trim();
                const linkMatch = text.match(
                    /<a href="\/(\S+)">([^\s<]+)<\/a>/
                );
                if (linkMatch) {
                    const [, linkHref, linkText] = linkMatch;
                    const linkNode = {
                        type: "element",
                        tagName: "a",
                        properties: { href: linkHref },
                        children: [{ type: "text", value: linkText }],
                    };
                    Object.assign(node, linkNode);
                }
            }
        });
    };
}

const prettyOptions = {
    // Use one of Shiki's packaged themes
    theme: {
        light: "min-light",
        dark: "one-dark-pro",
    },
    // Or your own JSON theme

    // Keep the background or use a custom background color?
    keepBackground: false,

    // Callback hooks to add custom logic to nodes when visiting
    // them.
    onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and
        // allow empty lines to be copy/pasted
        if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }];
        }
    },
    onVisitHighlightedLine(node) {
        // Each line node by default has `class="line"`.
        node.properties.className.push("highlighted");
    },
    onVisitHighlightedWord(node) {
        // Each word node has no className by default.
        node.properties.className = ["word"];
    },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    pageExtensions: ["ts", "tsx", "js", "jsx"],
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "img.youtube.com",
            "secure.meetupstatic.com",
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
            },
        ],
        deviceSizes: [640, 768, 828, 1024, 1280, 1536, 1920, 2048],
    },
    eslint: {
        dirs: ["app"],
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=15724800; includeSubDomains; preload",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src https://www.eventbrite.com/ 'self' 'unsafe-inline' https://vercel.live/; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.eventbrite.com/ https://vercel.live/ ; font-src 'self'; img-src 'self' https://assets.vercel.com/ https://img.youtube.com data:;",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/con",
                destination: "/con/2023",
                permanent: true,
            },
            {
                source: "/fr/con",
                destination: "/fr/con/2023",
                permanent: true,
            },
        ];
    },
    trailingSlash: true
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
            [rehypePrettyCode, prettyOptions],
            transformCustomLinks,
        ],
    },
});

export default withMDX(nextConfig);
