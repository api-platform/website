"use client";

// ugly component to prevents next strange navigation issue https://github.com/vercel/next.js/issues/51565
// TODO: replace it with next/link when / if the issue is fixed
import { useRouter } from "next/navigation";
import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
export type LinkProps = NextLinkProps;

export default function Link({ href, prefetch = null, ...props }: any) {
  const router = useRouter();
  const goToUrl = (e: MouseEvent) => {
    router.push(href);
    e.preventDefault();
  };
  const prefetchFalse = prefetch === false && props.target !== "_blank";
  if (prefetchFalse) {
    return <a href={href} onClick={goToUrl} {...props} />;
  }
  return <NextLink href={href} {...props} />;
}
