import Link from "next/link";

export default function NavLink({
  href,
  className,
  children,
  title,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const externalProps = href?.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return href ? (
    <Link className={className} href={href} title={title} {...externalProps}>
      {children}
    </Link>
  ) : (
    <a className={className} title={title} {...props}>
      {children}
    </a>
  );
}
