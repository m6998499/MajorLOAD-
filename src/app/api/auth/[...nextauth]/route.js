import NextAuth from "next-auth";

// FIXED: Using direct relative paths
import { authOptions } from "../../../../lib/authSettings"; 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
