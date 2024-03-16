import { env } from '@/lib/config/env';

import { sendTx } from '@/lib/utils/sendTx';

import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage
} from '@coinbase/onchainkit/frame';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const body: FrameRequest = await request.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return new Response('Message not valid', { status: 500 });
  }

  // const mockFid = 267755;
  await sendTx({ fid: message.interactor.fid });

  return new Response(
    getFrameHtmlResponse({
      image: {
        src: `${env.NEXT_PUBLIC_URL}/api/images/proposal/${params.slug}`
      }
    })
  );
}
