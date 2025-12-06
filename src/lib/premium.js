// src/lib/premium.js
import { db } from "./db";
import { withCache, invalidateCache } from "./cache";

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

    let result;
    if (user) {
      // User exists, update their premium status
      result = await db.user.update({
        where: { email },
        data: { isPremium },
      });
    } else {
      // User doesn't exist, create them with premium status
      // Note: name field is optional in the schema, will be populated on first login
      result = await db.user.create({
        data: {
          email,
          isPremium,
        },
      });
    }
    
    // Invalidate cache after updating premium status
    invalidateCache(`premium:${email}`);
    
    return result;
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

/**
 * Check if user has premium status (with caching)
 * This cached version reduces database load by caching the result for 30 seconds.
 * Premium status doesn't change frequently, making it an ideal candidate for caching.
 * 
 * For production with multiple servers, consider Prisma Accelerate: https://pris.ly/tip-3-accelerate
 * 
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} True if user is premium, false otherwise
 */
export async function isUserPremiumCached(email) {
  if (!email) return false;
  
  try {
    return await withCache(
      `premium:${email}`,
      30, // Cache for 30 seconds
      async () => {
        const user = await db.user.findUnique({
          where: { email },
          select: { isPremium: true },
        });
        return user?.isPremium || false;
      }
    );
  } catch (error) {
    console.error("Error checking user premium status:", error);
    return false;
  }
}
