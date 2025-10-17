import { z } from "zod";

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  BETTER_AUTH_SECRET: z.string().default("development-secret"),
  SPOTIFY_CLIENT_ID: z.string().default("placeholder"),
  SPOTIFY_CLIENT_SECRET: z.string().default("placeholder"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  REDIS_REST_URL: z.string().optional(),
  REDIS_REST_TOKEN: z.string().optional()
});

type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function env(): ServerEnv {
  if (cached) return cached;
  const parsed = serverSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
  if (parsed.data.NODE_ENV === "production") {
    const missing = [
      parsed.data.BETTER_AUTH_SECRET === "development-secret",
      parsed.data.SPOTIFY_CLIENT_ID === "placeholder",
      parsed.data.SPOTIFY_CLIENT_SECRET === "placeholder"
    ];
    if (missing.some(Boolean)) {
      throw new Error("Critical Spotify auth environment variables are missing in production.");
    }
  }
  cached = parsed.data;
  return cached;
}
