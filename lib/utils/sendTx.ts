import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { CHAIN_CONFIG } from '../config';
import { createSmartAccountClient } from 'permissionless';
import { signerToSafeSmartAccount } from 'permissionless/accounts';
import {
  Address,
  createPublicClient,
  encodeFunctionData,
  getContract
} from 'viem';
import { keccak256, toUtf8Bytes } from 'ethers';
import { privateKeyToAccount } from 'viem/accounts';

const buttons_mapping: { [key: number]: number } = {
  1: 1,
  2: 0,
  3: 2
};

const publicClient = createPublicClient({
  transport: CHAIN_CONFIG.transport,
  pollingInterval: 1_000
});

const createSigner = ({ fid }: { fid: number }) => {
  const timestamp = Date.now();
  const private_key = keccak256(
    toUtf8Bytes(fid.toString() + timestamp.toString())
  ) as `0x${string}`;

  const signer = privateKeyToAccount(private_key);

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

export const sendTx = async ({
  fid,
  contract_address,
  button_index,
  proposal_id
}: {
  fid: number;
  contract_address: Address;
  button_index: number;
  proposal_id: string;
}) => {
  const account = await getAccount({ fid });

  const paymasterClient = createPimlicoPaymasterClient({
    transport: CHAIN_CONFIG.transport,
    entryPoint: CHAIN_CONFIG.entry_point
    // pollingInterval: 500
  });

  const smartAccountClient = createSmartAccountClient({
    account: account,
    entryPoint: CHAIN_CONFIG.entry_point,
    chain: CHAIN_CONFIG.chain,
    bundlerTransport: CHAIN_CONFIG.transport,
    middleware: {
      sponsorUserOperation: paymasterClient.sponsorUserOperation
    }
    // pollingInterval: 500
  });

  try {
    const calldata = encodeFunctionData({
      functionName: 'castVote',
      abi: [
        {
          inputs: [
            { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
            { internalType: 'uint8', name: 'support', type: 'uint8' }
          ],
          name: 'castVote',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      args: [BigInt(proposal_id), buttons_mapping[button_index]]
    });

    const txHash = await smartAccountClient.sendTransaction({
      data: calldata,
      to: contract_address
    });
  } catch (err) {
    console.log('Err sending tx', err);
  }
};
