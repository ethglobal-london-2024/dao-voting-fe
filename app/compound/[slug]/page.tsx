import { env } from '@/lib/config/env';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Metadata } from 'next';

type CompoundPageProps = {
  params: { [key: string]: string };
};

const dog_img =
  'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHUyMzMxNzg4LWltYWdlLXJtNTAzLTAxXzEtbDBqOXFyYzMucG5n.png';

export function generateMetadata({ params }: CompoundPageProps): Metadata {
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
    postUrl: `${env.NEXT_PUBLIC_URL}/api/compound/${params.slug}`
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

export default function CompoundPage() {
  return (
    <>
      <h1>Compound Page</h1>
    </>
  );
}
