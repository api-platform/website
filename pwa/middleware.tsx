import { NextRequest, NextResponse } from "next/server";
import { i18n } from "i18n/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales = [...i18n.locales];
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export async function middleware(request: NextRequest) {
  const { locales, defaultLocale } = i18n;
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/docs")
  ) {
    // We're not using octokit here as we cannot instantiate it in the middleware
    const headers = new Headers();
    headers.append("accept", "application/vnd.github+json");
    headers.append("authorization", "Bearer " + process.env.GITHUB_KEY);
    headers.append("X-GitHub-Api-Version", "2022-11-28");

    const lastPart = pathname.split('/').slice(-1)[0];
    var i = lastPart.lastIndexOf('.');
    const ext = (i < 0) ? '' : lastPart.substr(i);

    if (!ext) {
      return NextResponse.next();
    }

    // It's probably an image let's fetch that from github
    let url = `https://api.github.com/repos/api-platform/docs/contents/${pathname.replace('/docs/', '')}`;
    // url += '?ref=${version}';

    try {
      const res = await fetch(url, { next: { tags: ["v2"] }, headers });
      const data = await res.json();
      const result = Buffer.from((data as any).content, "base64");
      return new NextResponse(result)
    } catch (error) {
      console.error('An error occured while fetching %s', url)
      console.error(error);
      return new NextResponse('', {status: 404});
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
