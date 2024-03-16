import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { env } from '@/lib/env';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time'
    },
    {
      action: 'tx',
      label: 'Send Base Sepolia',
      target: `${env.NEXT_PUBLIC_URL}/api/tx`,
      postUrl: `${env.NEXT_PUBLIC_URL}/api/tx-success`
    }
  ],
  image: {
    src: `${env.NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1'
  },
  input: {
    text: 'Tell me a story'
  },
  postUrl: `${env.NEXT_PUBLIC_URL}/api/frame`
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${env.NEXT_PUBLIC_URL}/park-1.png`]
  },
  other: {
    ...frameMetadata
  }
};

export default function Page() {
  return (
    <>
      <h1>DAO Voting</h1>
    </>
  );
}
