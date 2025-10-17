import { env } from "@/src/env";

const memoryCache = new Map<string, { expires: number; value: unknown }>();

async function setMemory(key: string, value: unknown, ttl: number) {
  memoryCache.set(key, { value, expires: Date.now() + ttl });
}

async function getMemory<T>(key: string): Promise<T | null> {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value as T;
}

export async function cached<T>(
  key: string,
  ttlMs: number,
  resolver: () => Promise<T>
): Promise<T> {
  const existing = await getMemory<T>(key);
  if (existing) return existing;

  const next = await resolver();
  await setMemory(key, next, ttlMs);
  return next;
}

export function cacheKey(userId: string, suffix: string) {
  return `${userId}:${suffix}`;
}
