import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isValidLocale, LANG_COOKIE } from "@/lib/i18n";

// Order: an explicit choice (cookie set by the language switcher) wins, then
// the browser's Accept-Language, then English.
function negotiateLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LANG_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language") ?? "";
  for (const tag of header.split(",")) {
    const primary = tag.split(";")[0].trim().split("-")[0].toLowerCase();
    if (isValidLocale(primary)) return primary;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isValidLocale(pathname.split("/")[1])) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiateLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any path with a file extension
  // (icons, portraits, the vision proposal HTML documents).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
