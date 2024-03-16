import { env } from '@/lib/config/env';
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse
} from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { chain_id: string; proposal_id: string } }
) {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  if (message.button === 4) {
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'For'
          },
          {
            label: 'Against'
          },
          {
            label: 'Abstain'
          },
          {
            label: 'Refresh'
          }
        ],
        image: {
          src: `${env.NEXT_PUBLIC_URL}/api/images/proposal/${params.chain_id}/${params.proposal_id}`,
          aspectRatio: '1:1'
        },
        postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${params.chain_id}/${params.proposal_id}`
      })
    );
  }
}

export const dynamic = 'force-dynamic';
