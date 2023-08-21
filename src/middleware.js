import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth);
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role !== 1
    ) {
      return new NextResponse("No autorizado");
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin"],
  // matcher: ["/dashboard", "/dashboard/:path*", "/app/:path*", ""],
};
