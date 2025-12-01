export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/loadboard/:path*",
    "/post-load/:path*",
  ],
};
