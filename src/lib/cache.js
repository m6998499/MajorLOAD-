// src/lib/cache.js
/**
 * Simple query caching utility for MajorLOAD
 * 
 * This implements basic in-memory caching to reduce database load.
 * For production with multiple servers, consider Prisma Accelerate:
 * https://pris.ly/tip-3-accelerate
 */

const cache = new Map();

/**
 * Execute a query with caching
 * @param {string} key - Unique cache key
 * @param {number} ttlSeconds - Time to live in seconds
 * @param {Function} queryFn - Async function that performs the query
 * @returns {Promise<any>} Cached or fresh query result
 */
export async function withCache(key, ttlSeconds, queryFn) {
  const cached = cache.get(key);
  
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }
  
  const data = await queryFn();
  
  cache.set(key, {
    data,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
  
  return data;
}

/**
 * Invalidate a specific cache key
 * @param {string} key - Cache key to invalidate
 */
export function invalidateCache(key) {
  cache.delete(key);
}

/**
 * Clear all cache entries
 */
export function clearAllCache() {
  cache.clear();
}

// Periodic cleanup of expired entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of cache.entries()) {
      if (now >= value.expiresAt) {
        cache.delete(key);
      }
    }
  }, 60000);
}
