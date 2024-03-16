import { http } from 'viem';
import { base } from 'viem/chains';
import { env } from './env';
import { EntryPoint } from 'permissionless/types';

export const CHAIN_CONFIG = {
  chain: base,
  entry_point: env.NEXT_PUBLIC_ENTRY_POINT as any,
  transport: http(env.NEXT_PUBLIC_BASE_RPC_URL)
};
