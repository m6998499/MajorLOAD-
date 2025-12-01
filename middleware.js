export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",              // homepage
    "/loadboard/:path*",   // lock /loadboard and anything inside it
    "/post-load/:path*",   // lock /post-load and anything inside it
  ],
};
