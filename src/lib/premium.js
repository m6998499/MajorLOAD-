// src/lib/premium.js
import { db } from "./db";

/**
 * Set user's premium status
 * @param {string} email - User's email address
 * @param {boolean} isPremium - Premium status to set
 * @returns {Promise<Object>} Updated user object
 */
export async function setUserPremium(email, isPremium) {
  try {
    // First, try to find the user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // User exists, update their premium status
      return await db.user.update({
        where: { email },
        data: { isPremium },
      });
    } else {
      // User doesn't exist, create them with premium status
      // Note: name field is optional in the schema, will be populated on first login
      return await db.user.create({
        data: {
          email,
          isPremium,
        },
      });
    }
  } catch (error) {
    console.error("Error setting user premium status:", error);
    throw error;
  }
}

/**
 * Check if user has premium status
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} True if user is premium, false otherwise
 */
export async function isUserPremium(email) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      select: { isPremium: true },
    });

    return user?.isPremium || false;
  } catch (error) {
    console.error("Error checking user premium status:", error);
    return false;
  }
}
