import NextAuth from "next-auth";
// CHANGED: Importing from the new file name
import { authOptions } from "@/lib/authConfig"; 

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
