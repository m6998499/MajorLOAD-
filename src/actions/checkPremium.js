"use server";

import { db } from "@/lib/db";

export async function checkPremium(email) {
  // 1. Safety check: if no email is provided, they can't be premium
  if (!email) return false;

  // 2. Ask the database: "Find the user with this email, and tell me if isPremium is true"
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      isPremium: true, // We only fetch this one field to be fast
    },
  });

  // 3. Return the result (default to false if user not found)
  return user?.isPremium || false;
}
