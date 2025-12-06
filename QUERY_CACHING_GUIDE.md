# Query Caching Guide

This guide explains how to implement query caching in the MajorLOAD application to improve performance.

## Why Query Caching?

Database queries can be expensive, especially when:
- The same data is requested frequently
- The data doesn't change often
- Multiple users request the same information

Query caching stores query results temporarily to reduce database load and improve response times.

## Caching Options for Prisma

### Option 1: Prisma Accelerate (Recommended for Production)

Prisma Accelerate provides global caching and connection pooling in just a few lines of code.

**Benefits:**
- Global edge caching across regions
- Built-in connection pooling
- No infrastructure management
- Simple TTL-based cache configuration

**Setup:**
```javascript
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

// Query with caching (30 second TTL)
const users = await prisma.user.findMany({
  cacheStrategy: { ttl: 30 },
})
```

**Learn more:** https://pris.ly/tip-3-accelerate

### Option 2: Application-Level Caching (Current Implementation)

For development or simple applications, you can implement caching at the application level using:

1. **In-Memory Cache** (Node.js Map/Object)
   - Simple and fast
   - Works for single-server deployments
   - Cache lost on server restart

2. **Redis Cache**
   - Distributed caching
   - Persistent across server restarts
   - Works for multi-server deployments

3. **Next.js Cache APIs**
   - `unstable_cache` for server components
   - Automatic revalidation
   - Integrated with Next.js build system

## Implementation Examples

### Example 1: Simple In-Memory Cache

```javascript
// src/lib/cache.js
const cache = new Map();

export function cacheQuery(key, ttlSeconds = 60) {
  return async (queryFn) => {
    const cached = cache.get(key);
    
    if (cached && Date.now() < cached.expiresAt) {
      console.log(`Cache hit: ${key}`);
      return cached.data;
    }
    
    console.log(`Cache miss: ${key}`);
    const data = await queryFn();
    
    cache.set(key, {
      data,
      expiresAt: Date.now() + (ttlSeconds * 1000),
    });
    
    return data;
  };
}

// Clear expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now >= value.expiresAt) {
      cache.delete(key);
    }
  }
}, 60000); // Clean up every minute
```

**Usage:**
```javascript
import { cacheQuery } from './cache';
import { db } from './db';

export async function isUserPremium(email) {
  return cacheQuery(`premium:${email}`, 30)(async () => {
    const user = await db.user.findUnique({
      where: { email },
      select: { isPremium: true },
    });
    return user?.isPremium || false;
  });
}
```

### Example 2: Next.js unstable_cache

```javascript
import { unstable_cache } from 'next/cache';
import { db } from './db';

export const getCachedPremiumStatus = unstable_cache(
  async (email) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { isPremium: true },
    });
    return user?.isPremium || false;
  },
  ['user-premium'], // cache key prefix
  {
    revalidate: 30, // revalidate every 30 seconds
    tags: ['premium-status'], // for on-demand revalidation
  }
);
```

### Example 3: Redis Cache (for Production)

```javascript
// src/lib/redis-cache.js
import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

export async function cachedQuery(key, ttlSeconds, queryFn) {
  // Try to get from cache
  const cached = await redis.get(key);
  
  if (cached) {
    console.log(`Redis cache hit: ${key}`);
    return JSON.parse(cached);
  }
  
  // Execute query
  console.log(`Redis cache miss: ${key}`);
  const data = await queryFn();
  
  // Store in cache
  await redis.setEx(key, ttlSeconds, JSON.stringify(data));
  
  return data;
}

// Usage
import { cachedQuery } from './redis-cache';

export async function isUserPremium(email) {
  return cachedQuery(`premium:${email}`, 30, async () => {
    const user = await db.user.findUnique({
      where: { email },
      select: { isPremium: true },
    });
    return user?.isPremium || false;
  });
}
```

## When to Use Caching

### Good Candidates for Caching:
- ✅ User premium status (changes infrequently)
- ✅ User profile information
- ✅ Load listings (for short durations)
- ✅ Configuration settings
- ✅ Frequently accessed reference data

### Avoid Caching:
- ❌ Real-time data requiring immediate consistency
- ❌ User-specific sensitive data (unless properly scoped)
- ❌ Data that changes frequently
- ❌ Write operations (creates, updates, deletes)

## Cache Invalidation Strategies

### 1. Time-Based (TTL)
- Set an expiration time for cached data
- Simple and predictable
- May serve stale data briefly

### 2. Event-Based
- Invalidate cache when data changes
- Most accurate
- Requires more logic

```javascript
// Invalidate cache after update
export async function setUserPremium(email, isPremium) {
  const user = await db.user.update({
    where: { email },
    data: { isPremium },
  });
  
  // Invalidate cache
  cache.delete(`premium:${email}`);
  
  return user;
}
```

### 3. Tag-Based (Next.js)
```javascript
import { revalidateTag } from 'next/cache';

// Trigger revalidation
revalidateTag('premium-status');
```

## Performance Considerations

### Cache Hit Rate
Monitor your cache hit rate to ensure caching is effective:
```javascript
let hits = 0;
let misses = 0;

export function getCacheStats() {
  const total = hits + misses;
  return {
    hits,
    misses,
    hitRate: total > 0 ? (hits / total * 100).toFixed(2) + '%' : '0%',
  };
}
```

### Memory Usage
- In-memory caches grow with data
- Set reasonable TTLs
- Implement cache size limits
- Use Redis for larger applications

## Migration Path to Prisma Accelerate

When you're ready to use Prisma Accelerate:

1. **Sign up for Accelerate:** https://console.prisma.io/
2. **Get your Accelerate connection string**
3. **Update your Prisma Client:**
   ```bash
   npm install @prisma/client@latest @prisma/extension-accelerate
   ```
4. **Update db.js:**
   ```javascript
   import { PrismaClient } from '@prisma/client/edge'
   import { withAccelerate } from '@prisma/extension-accelerate'
   
   export const db = new PrismaClient().$extends(withAccelerate())
   ```
5. **Add caching to queries:**
   ```javascript
   const user = await db.user.findUnique({
     where: { email },
     cacheStrategy: { ttl: 60 },
   });
   ```

## Testing Cache Performance

Create a simple benchmark:
```javascript
// test-cache.js
import { isUserPremium } from './src/lib/premium.js';

async function benchmark() {
  const email = 'test@example.com';
  const iterations = 100;
  
  console.time('With cache');
  for (let i = 0; i < iterations; i++) {
    await isUserPremium(email);
  }
  console.timeEnd('With cache');
}

benchmark();
```

## Conclusion

Query caching can significantly improve your application's performance. Start with simple in-memory caching for development, and consider Prisma Accelerate for production deployments where you need global caching, connection pooling, and minimal setup.

**Next Steps:**
1. Review the examples in `src/lib/cache-examples.js`
2. Decide which caching strategy fits your needs
3. Implement caching for frequently accessed queries
4. Monitor cache performance
5. Consider Prisma Accelerate for production
