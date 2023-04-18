import { NextRequest, NextResponse } from "next/server";
import { i18n } from "i18n/i18n-config";

export async function middleware(request: NextRequest) {
  const { defaultLocale, locales } = i18n;
  const pathname = request.nextUrl.pathname;

  if (
    !pathname.startsWith("/fr/con") &&
    !pathname.startsWith("/en/con") &&
    !pathname.startsWith("/con")
  ) {
    return NextResponse.next();
  }
  // Check if the default locale is in the pathname
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    // e.g. incoming request is /en/con
    // The new URL is now /con
    const url = new URL(
      pathname.replace(
        `/${defaultLocale}`,
        pathname === `/${defaultLocale}` ? "/" : ""
      ),
      request.url
    );
    return NextResponse.redirect(url);
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale -> Rewrite so Next.js understands
  // (e.g. incoming request is /con => Tell Next.js it should pretend it's /en/con)
  if (pathnameIsMissingLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/((?!.*\\.).*)", "/favicon.ico"],
};
