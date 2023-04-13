import Link from "next/link";

export default function NavLink({
  href,
  className,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const externalProps = href?.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return href ? (
    <Link className={className} href={href} {...externalProps}>
      {children}
    </Link>
  ) : (
    <a className={className} {...props}>
      {children}
    </a>
  );
}
