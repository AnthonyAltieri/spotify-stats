declare module "better-auth" {
  export type Session = {
    user: {
      id: string;
      name?: string | null;
      image?: string | null;
      scopes?: string[];
    };
    providers?: Record<string, { accessToken?: string }>;
    tokens?: Record<string, { accessToken?: string }>;
  };

  type ProviderConfig = Record<string, unknown>;

  export function betterAuth(config: {
    secret: string;
    providers: ProviderConfig[];
    session?: { cookieName?: string };
  }): {
    api: {
      getSession: (context: { cookies: unknown; headers: unknown }) => Promise<Session | null>;
    };
  };
}

declare module "better-auth/providers/spotify" {
  export function spotify(config: {
    clientId: string;
    clientSecret: string;
    scopes?: string[];
  }): Record<string, unknown>;
}

declare module "@better-auth/next/route-handler" {
  import type { NextRequest } from "next/server";
  export function createRouteHandler(auth: {
    api: { getSession: (context: { cookies: unknown; headers: unknown }) => Promise<unknown> };
  }): {
    GET: (req: NextRequest) => Promise<Response>;
    POST: (req: NextRequest) => Promise<Response>;
  };
}

declare module "@better-auth/next/withBetterAuth" {
  import type { NextConfig } from "next";
  export default function withBetterAuth(config: NextConfig): NextConfig;
}
