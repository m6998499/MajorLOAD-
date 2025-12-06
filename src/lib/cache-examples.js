// src/lib/cache-examples.js
/**
 * Query Caching Examples for MajorLOAD
 * 
 * This file demonstrates different approaches to query caching in the application.
 * These examples show how to implement caching "in just a few lines of code" as
 * mentioned in the Prisma tip about Accelerate.
 * 
 * For production, consider using Prisma Accelerate: https://pris.ly/tip-3-accelerate
 */

import { db } from "./db";

// =============================================================================
// Example 1: Simple In-Memory Cache with TTL
// =============================================================================

/**
 * Simple in-memory cache implementation
 * 
 * NOTE: This is a separate cache instance from src/lib/cache.js for
 * demonstration and testing purposes. In production, you would use the
 * shared cache from src/lib/cache.js or Prisma Accelerate.
 * 
 * Good for: Development, single-server deployments
 * Limitations: Cache lost on restart, not shared across servers
 */
const memoryCache = new Map();

/**
 * Generic cache wrapper function
 * @param {string} key - Cache key
 * @param {number} ttlSeconds - Time to live in seconds
 * @param {Function} queryFn - Function that performs the database query
 * @returns {Promise<any>} Cached or fresh data
 */
export async function cachedQuery(key, ttlSeconds, queryFn) {
  const cached = memoryCache.get(key);
  
  // Check if cache exists and hasn't expired
  if (cached && Date.now() < cached.expiresAt) {
    console.log(`[Cache] HIT: ${key}`);
    return cached.data;
  }
  
  // Cache miss or expired - fetch fresh data
  console.log(`[Cache] MISS: ${key}`);
  const data = await queryFn();
  
  // Store in cache with expiration
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
  
  return data;
}

/**
 * Clear all cache entries (useful for testing or manual invalidation)
 */
export function clearCache() {
  memoryCache.clear();
  console.log('[Cache] Cleared all entries');
}

/**
 * Clear a specific cache key
 * @param {string} key - Cache key to clear
 */
export function clearCacheKey(key) {
  memoryCache.delete(key);
  console.log(`[Cache] Cleared key: ${key}`);
}

/**
 * Get cache statistics
 * @returns {Object} Cache stats
 */
export function getCacheStats() {
  return {
    size: memoryCache.size,
    keys: Array.from(memoryCache.keys()),
  };
}

// Automatic cleanup of expired entries (runs every minute)
if (typeof setInterval !== 'undefined') {
  const cleanupInterval = setInterval(() => {
    try {
      const now = Date.now();
      let cleaned = 0;
      
      for (const [key, value] of memoryCache.entries()) {
        if (now >= value.expiresAt) {
          memoryCache.delete(key);
          cleaned++;
        }
      }
      
      if (cleaned > 0) {
        console.log(`[Cache] Cleaned up ${cleaned} expired entries`);
      }
    } catch (error) {
      console.error('[Cache] Error during cleanup:', error);
    }
  }, 60000); // Clean every minute
  
  // Prevent the interval from keeping the process alive
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

// =============================================================================
// Example 2: Cached Premium Status Check
// =============================================================================

/**
 * Check if user has premium status with caching
 * Cache duration: 30 seconds
 * 
 * Why cache this?
 * - Premium status doesn't change frequently
 * - Checked on every load board visit
 * - Reduces database load significantly
 * 
 * @param {string} email - User's email address
 * @returns {Promise<boolean>} True if user is premium
 */
export async function getCachedUserPremium(email) {
  if (!email) return false;
  
  return cachedQuery(
    `premium:${email}`, // Cache key
    30, // TTL: 30 seconds
    async () => {
      // This query only runs on cache miss
      const user = await db.user.findUnique({
        where: { email },
        select: { isPremium: true },
      });
      return user?.isPremium || false;
    }
  );
}

// =============================================================================
// Example 3: Cached User Profile
// =============================================================================

/**
 * Get user profile with caching
 * Cache duration: 60 seconds
 * 
 * @param {string} email - User's email address
 * @returns {Promise<Object|null>} User profile or null
 */
export async function getCachedUserProfile(email) {
  if (!email) return null;
  
  return cachedQuery(
    `user:${email}`,
    60, // TTL: 60 seconds
    async () => {
      return await db.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          isPremium: true,
          createdAt: true,
        },
      });
    }
  );
}

// =============================================================================
// Example 4: Cached Load Listings
// =============================================================================

/**
 * Get load listings with caching
 * Cache duration: 15 seconds (shorter because loads change frequently)
 * 
 * @param {number} limit - Maximum number of loads to return
 * @returns {Promise<Array>} Array of load objects
 */
export async function getCachedLoads(limit = 20) {
  return cachedQuery(
    `loads:latest:${limit}`,
    15, // TTL: 15 seconds
    async () => {
      return await db.load.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }
  );
}

// =============================================================================
// Example 5: Cache with Automatic Invalidation
// =============================================================================

/**
 * Update user premium status and invalidate cache
 * This ensures the cache stays consistent with the database
 * 
 * @param {string} email - User's email address
 * @param {boolean} isPremium - Premium status to set
 * @returns {Promise<Object>} Updated user object
 */
export async function setUserPremiumWithCacheInvalidation(email, isPremium) {
  // Perform the update
  const user = await db.user.upsert({
    where: { email },
    update: { isPremium },
    create: { email, isPremium },
  });
  
  // Invalidate related caches
  clearCacheKey(`premium:${email}`);
  clearCacheKey(`user:${email}`);
  
  console.log(`[Cache] Invalidated cache for user: ${email}`);
  
  return user;
}

// =============================================================================
// Example 6: Batch Cache Warming
// =============================================================================

/**
 * Pre-populate cache with frequently accessed data
 * Call this on application startup or periodically
 */
export async function warmCache() {
  console.log('[Cache] Starting cache warming...');
  
  try {
    // Pre-cache recent loads
    await getCachedLoads(20);
    
    // Pre-cache premium users
    const premiumUsers = await db.user.findMany({
      where: { isPremium: true },
      select: { email: true },
    });
    
    for (const user of premiumUsers) {
      await getCachedUserPremium(user.email);
    }
    
    console.log(`[Cache] Warmed cache for ${premiumUsers.length} premium users`);
  } catch (error) {
    console.error('[Cache] Error warming cache:', error);
  }
}

// =============================================================================
// Comparison: With vs Without Caching
// =============================================================================

/**
 * Example showing the difference between cached and uncached queries
 */
export async function demonstrateCacheBenefit(email) {
  console.log('\n=== Cache Performance Demonstration ===\n');
  
  // Clear cache to start fresh
  clearCache();
  
  // First call - cache miss (slower)
  console.time('First call (cache miss)');
  await getCachedUserPremium(email);
  console.timeEnd('First call (cache miss)');
  
  // Second call - cache hit (faster)
  console.time('Second call (cache hit)');
  await getCachedUserPremium(email);
  console.timeEnd('Second call (cache hit)');
  
  // Third call - still cached (fast)
  console.time('Third call (cache hit)');
  await getCachedUserPremium(email);
  console.timeEnd('Third call (cache hit)');
  
  console.log('\n=== Cache Stats ===');
  console.log(getCacheStats());
}

// =============================================================================
// Integration with Prisma Accelerate (Future)
// =============================================================================

/**
 * Example of how queries would look with Prisma Accelerate
 * 
 * When ready to use Accelerate, simply:
 * 1. Install: npm install @prisma/extension-accelerate
 * 2. Update db.js to use withAccelerate()
 * 3. Add cacheStrategy to your queries
 * 
 * Learn more: https://pris.ly/tip-3-accelerate
 */

/*
// This is how the same query would look with Prisma Accelerate:

import { db } from './db'; // db would be extended with Accelerate

export async function getUserPremiumWithAccelerate(email) {
  const user = await db.user.findUnique({
    where: { email },
    select: { isPremium: true },
    cacheStrategy: { 
      ttl: 30,  // Cache for 30 seconds
      swr: 60,  // Serve stale content for 60 seconds while revalidating
    },
  });
  
  return user?.isPremium || false;
}

// Benefits of Prisma Accelerate:
// - Global edge caching (not just in-memory)
// - Automatic connection pooling
// - Stale-while-revalidate support
// - No infrastructure to manage
// - Works across multiple servers
*/

// =============================================================================
// Export Examples for Testing
// =============================================================================

export const examples = {
  cachedQuery,
  clearCache,
  clearCacheKey,
  getCacheStats,
  getCachedUserPremium,
  getCachedUserProfile,
  getCachedLoads,
  setUserPremiumWithCacheInvalidation,
  warmCache,
  demonstrateCacheBenefit,
};
