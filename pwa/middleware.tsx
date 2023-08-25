import { NextRequest, NextResponse } from "next/server";
import { i18n } from "i18n/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { current, versions } from "consts";

function getLocale(request: NextRequest): string | undefined {
  try {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({
      headers: negotiatorHeaders,
    }).languages();
    const locales = [...i18n.locales];
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return ([...i18n.locales] as string[]).includes(locale)
      ? locale
      : i18n.defaultLocale;
  } catch (e) {
    console.error(e);
    return i18n.defaultLocale;
  }
}

export async function middleware(request: NextRequest) {
  const { locales, defaultLocale } = i18n;
  const pathname = request.nextUrl.pathname;

  // handle current doc version to skip the version in pathname
  if (
    pathname.startsWith("/docs/") &&
    !/\.(jpg|jpeg|png|gif)$/.test(pathname)
  ) {
    if (
      pathname.startsWith(`/docs/v${current}`) &&
      !request.cookies.get("redirected")
    ) {
      const url = new URL(pathname.replace(`v${current}/`, ""), request.url);
      const response = NextResponse.redirect(url);
      response.cookies.set("redirected", "true", { maxAge: 10 });
      return response;
    }

    const isMissingVersion = versions.every(
      (version) => !pathname.startsWith(`/docs/v${version}/`)
    );

    if (isMissingVersion) {
      return NextResponse.rewrite(
        new URL(pathname.replace("/docs/", `/docs/v${current}/`), request.url)
      );
    }
  }

  if (
    !pathname.startsWith("/fr/con") &&
    !pathname.startsWith("/en/con") &&
    !pathname.startsWith("/con")
  ) {
    return NextResponse.next();
  }

  // Check if the default locale is in the pathname
  if (pathname.startsWith(`/${defaultLocale}/`)) {
    // we want to REMOVE the default locale from the pathname,
    // and later use a rewrite so that Next will still match
    // the correct code file as if there was a locale in the pathname
    const url = new URL(pathname.replace(`${defaultLocale}/`, ""), request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("redirected", "true", { maxAge: 10 });
    return response;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const matchedLocale = getLocale(request);
    if (matchedLocale !== defaultLocale && !request.cookies.get("redirected")) {
      return NextResponse.redirect(
        new URL(`/${matchedLocale}/${pathname}`, request.url)
      );
    } else {
      return NextResponse.rewrite(
        new URL(`/${defaultLocale}${pathname}`, request.url)
      );
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
