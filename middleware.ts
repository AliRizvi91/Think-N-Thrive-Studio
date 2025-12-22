import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Map clean URLs to folder-based routes
  const map: Record<string, string> = {
    "/about": "/with-nav-footer/about",
    "/contact": "/with-nav-footer/contact",
    "/courses": "/with-nav-footer/courses",
    "/admission": "/with-nav-footer/admission",
    "/authenticate": "/with-nav-footer/authenticate",
    "/course": "/with-nav-footer/course", // handle dynamic below
    "/profile": "/with-nav-footer/profile",
    "/details": "/with-nav-footer/details",
    "/faqs": "/with-nav-footer/faqs",
    "/admin-course": "/with-nav-footer/adminCourse",
    "/verification": "/no-nav-footer/verify-email",
  };

  // Handle dynamic route like /course/:id
  if (url.pathname.startsWith("/course/")) {
    url.pathname = url.pathname.replace("/course", "/with-nav-footer/course");
    return NextResponse.rewrite(url);
  }

  if (map[url.pathname]) {
    url.pathname = map[url.pathname];
    return NextResponse.rewrite(url); // rewrite, not redirect
  }

  return NextResponse.next();
}
