import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Static clean URL mapping
  const map: Record<string, string> = {
    "/": "/with-nav-footer/home",
    "/home": "/with-nav-footer/home",
    "/about": "/with-nav-footer/about",
    "/contact": "/with-nav-footer/contact",
    "/courses": "/with-nav-footer/courses",
    "/admission": "/with-nav-footer/admission",
    "/authenticate": "/with-nav-footer/authenticate",
    "/profile": "/with-nav-footer/profile",
    "/details": "/with-nav-footer/details",
    "/faqs": "/with-nav-footer/faqs",
    "/admin-course": "/with-nav-footer/adminCourse",
    "/verification": "/no-nav-footer/verify-email",
  };

  // Handle dynamic route: /course/:id
  if (url.pathname.startsWith("/course/")) {
    url.pathname = url.pathname.replace("/course", "/with-nav-footer/course");
    return NextResponse.rewrite(url);
  }

  // Rewrite static routes
  if (map[url.pathname]) {
    url.pathname = map[url.pathname];
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Optional: Apply middleware to all paths
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // Exclude Next.js internals
};
