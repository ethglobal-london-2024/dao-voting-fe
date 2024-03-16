import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_BASE_RPC_URL: z.string().url(),
    NEXT_PUBLIC_ENTRY_POINT: z.string()
  },
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_BASE_RPC_URL: process.env.NEXT_PUBLIC_BASE_RPC_URL,
    NEXT_PUBLIC_ENTRY_POINT: process.env.NEXT_PUBLIC_ENTRY_POINT
  }
});
