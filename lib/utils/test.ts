import { Contract, JsonRpcProvider, Wallet } from 'ethers';

const provider = new JsonRpcProvider('https://mainnet.base.org');
const wallet = Wallet.createRandom();

const contract = new Contract('', [], wallet);
