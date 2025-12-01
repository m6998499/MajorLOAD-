export { default } from "next-auth/middleware";

// This list defines which pages are PROTECTED.
// Users cannot see these pages unless they are logged in.
export const config = { 
  matcher: [
    "/loadboard", 
    "/postload",
    "/dashboard" 
  ] 
};
