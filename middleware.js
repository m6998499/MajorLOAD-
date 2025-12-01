import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",               // Lock homepage
    "/loadboard/:path*",  
    "/post-load/:path*"
  ],
};
