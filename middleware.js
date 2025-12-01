export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",             // lock homepage
    "/loadboard/:path*", 
    "/post-load/:path*"
  ],
};
