// @ts-check

import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import nextMDX from "@next/mdx";
import { visit, CONTINUE, SKIP } from "unist-util-visit";

/**
 * This handles links after the code is rendered so that
 * we can link method types and interfaces directly from the code.
 */
function transformCustomLinks() {
    function getLinkNode(text) {
        const linkMatch = text.match(/<a href="(\/\S+)">([^\s<]+)<\/a>/);

        if (!linkMatch) {
            return null;
        }

        const [, linkHref, linkText] = linkMatch;
        return {
            type: "element",
            tagName: "a",
            properties: { href: linkHref },
            children: [{ type: "text", value: linkText }],
        };
    }

    return (tree) => {
        visit(tree, "element", (code) => {
            if (code.tagName !== "code") {
                return CONTINUE;
            }

            let start = null;
            visit(code, "element", (node, index, parent) => {
                if (
                    node.children.length !== 1 ||
                    node.children[0].type !== "text"
                ) {
                    return CONTINUE;
                }

                const text = node.children[0].value.trim();

                if (text === "`<") {
                    start = index;
                    return CONTINUE;
                }

                if (text === ">`") {
                    const text = parent.children
                        .slice(start, index + 1)
                        .map((e) => e.children[0].value);
                    const linkNode = getLinkNode(text.join(""));

                    if (linkNode) {
                        linkNode.children[0].value =
                            " " + linkNode.children[0].value;
                        parent.children.splice(
                            start,
                            index + 1 - start,
                            linkNode
                        );
                    }

                    start = null;
                    return CONTINUE;
                }

                if (start !== null) {
                    return CONTINUE;
                }

                const linkNode = getLinkNode(text);
                if (linkNode) {
                    if (node.children[0].value.startsWith(" ")) {
                        linkNode.children[0].value =
                            " " + linkNode.children[0].value;
                    }

                    Object.assign(node, linkNode);
                }
            });

            return SKIP;
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
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
        deviceSizes: [640, 768, 828, 1024, 1280, 1536, 1920, 2048],
    },
    eslint: {
        ignoreDuringBuilds: true,
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
            {
                source: "/docs/",
                destination: "/docs/distribution/",
                permanent: true,
            },
        ];
    },
    experimental: {
        serverMinification: false,
        esmExternals: false,
        webpackBuildWorker: true,
        // mdxRs: true,
    },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = nextMDX({
    extension: /\.(mdx)$/, // We have errors inside our md files on the documentation that we should fix to use MDX instead of MarkdownIt
    options: {
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [
            [rehypePrettyCode, prettyOptions],
            transformCustomLinks,
            rehypeSlug,
            rehypeAutolinkHeadings,
        ],
    },
});

export default withMDX(nextConfig);
