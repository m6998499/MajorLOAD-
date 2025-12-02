"use server";

import { db } from "@/lib/db";

export async function checkPremium(email) {
  // 1. Safety check
  if (!email) return false;

  try {
    // 2. Look up the user
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isPremium: true,
      },
    });

    // 3. Return status (default to false if user not found)
    return user?.isPremium || false;
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
}
