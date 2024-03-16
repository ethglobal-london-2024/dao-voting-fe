import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { CHAIN_CONFIG } from '../config';
import { createSmartAccountClient } from 'permissionless';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import { Address, createPublicClient, getContract } from 'viem';
import { keccak256, toUtf8Bytes } from 'ethers';
import { privateKeyToAccount } from 'viem/accounts';

const publicClient = createPublicClient({
  transport: CHAIN_CONFIG.transport,
  pollingInterval: 1_000
});

const createSigner = ({ fid }: { fid: number }) => {
  const private_key = keccak256(toUtf8Bytes(fid.toString())) as `0x${string}`;

  const signer = privateKeyToAccount(private_key);
  console.log(signer.address);
  return { signer };
};

const getAccount = async ({ fid }: { fid: number }) => {
  const { signer } = createSigner({ fid });

  return await signerToSafeSmartAccount(publicClient, {
    entryPoint: CHAIN_CONFIG.entry_point as any,
    signer: signer,
    safeVersion: '1.4.1'
    // index: 0n, // optional
    // address: signer.address as Address
  });
};

export const sendTx = async ({ fid }: { fid: number }) => {
  const account = await getAccount({ fid });

  const paymasterClient = createPimlicoPaymasterClient({
    transport: CHAIN_CONFIG.transport,
    entryPoint: CHAIN_CONFIG.entry_point
  });

  const smartAccountClient = createSmartAccountClient({
    account: account,
    entryPoint: CHAIN_CONFIG.entry_point,
    chain: CHAIN_CONFIG.chain,
    bundlerTransport: CHAIN_CONFIG.transport,
    middleware: {
      sponsorUserOperation: paymasterClient.sponsorUserOperation
    }
  });

  const txHash = await smartAccountClient.sendTransaction({
    data: '0x5678138837c7cbbd36f10d968ba1336ed38fd88a26baf6b0e1fd736d546ee94827b9192a0000000000000000000000000000000000000000000000000000000000000001',
    to: '0x8768c789C6df8AF1a92d96dE823b4F80010Db294'
  });
  console.log(5);
  // const txHash = await smartAccountClient.sendTransaction({
  //   account: smartAccountClient.account,
  //   to: '0xc01679F6496A542250f114d6D8A95c86f9DEc63a',
  //   value: BigInt('1000000000000')
  // });

  console.log(txHash);
};
