// src/lib/cache.ts
import { createCache } from 'cache-manager';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { CacheableMemory } from 'cacheable';

const CACHE_DRIVER = process.env.CACHE_DRIVER || 'memory';
const TTL = Number(process.env.CACHE_TTL || 3600_000); // ms

let cache;

if (CACHE_DRIVER === 'memory') {
  cache = createCache({
    stores: [
      new Keyv({
        store: new CacheableMemory({
          ttl: TTL,
          lruSize: 5000,
        }),
      }),
    ],
    ttl: TTL,
  });
} else if (CACHE_DRIVER === 'redis') {
  const redisUrl = buildRedisUrl();
  cache = createCache({
    stores: [
      // L1 cache (RAM)
      // new Keyv({
      //   store: new CacheableMemory({
      //     ttl: TTL,
      //     lruSize: 5000,
      //   }),
      // }),

      // L2 cache (Redis)
      new Keyv({
        store: new KeyvRedis(redisUrl),
      }),
    ],
    ttl: TTL,
  });
} else {
  throw new Error(`Unsupported CACHE_DRIVER: ${CACHE_DRIVER}`);
}

export default cache;

function buildRedisUrl() {
  const host = process.env.REDIS_HOST || 'localhost';
  const port = process.env.REDIS_PORT || '6379';
  const db = process.env.REDIS_DB || '0';
  const password = process.env.REDIS_PASSWORD;

  const auth = password ? `:${password}@` : '';

  return `redis://${auth}${host}:${port}/${db}`;
}
