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

const nextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx"],
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone",
    experimental: {
        appDir: true,
        mdxRs: false,
    },
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
    },
    eslint: {
        dirs: ["app"],
    },
    async redirects() {
        return [
            {
                source: "/con",
                destination: "/con/2023",
                permanent: true,
            },
        ];
    },
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
        esm: true,
    },
});
export default withMDX(nextConfig);
