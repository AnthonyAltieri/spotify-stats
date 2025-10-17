import { createRequire } from "module";

const require = createRequire(import.meta.url);

const withBetterAuth = require("@better-auth/next/withBetterAuth");

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"]
    }
  }
};

export default withBetterAuth(config);
