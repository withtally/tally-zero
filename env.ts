/* eslint-disable no-process-env */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_NODE_ENV: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID:
      process.env.NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID,
  },
});
