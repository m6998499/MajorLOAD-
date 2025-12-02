"use server";

// FIXED: Go up one folder (..) then into lib/db
import { db } from "../lib/db";

export async function checkPremium(email) {
  if (!email) return false;

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        isPremium: true,
      },
    });

    return user?.isPremium || false;
  } catch (error) {
    console.error("Error checking premium status:", error);
    return false;
  }
}
