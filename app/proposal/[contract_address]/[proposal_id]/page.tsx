import { env } from '@/lib/config/env';
import { fetchProposalDocuments } from '@/lib/utils/fetcher';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Metadata } from 'next';

type CompoundPageProps = {
  params: { [key: string]: string };
};

const dog_img =
  'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHUyMzMxNzg4LWltYWdlLXJtNTAzLTAxXzEtbDBqOXFyYzMucG5n.png';

export async function generateMetadata({
  params
}: CompoundPageProps): Promise<Metadata> {
  const { contract_address, proposal_id } = params;

  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'Vote for'
      },
      {
        label: 'Vote against'
      }
    ],
    image: {
      src: dog_img
    },
    postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${contract_address}/${proposal_id}`
  });

  return {
    title: 'DAO Voting',
    description: 'LFG',
    openGraph: {
      title: 'DAO Voting',
      description: 'LFG',
      images: [dog_img]
    },
    other: {
      ...frameMetadata
    }
  };
}

export default async function CompoundPage() {
  return (
    <>
      <h1>Compound Page</h1>
    </>
  );
}
