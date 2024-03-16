import { env } from '@/lib/config/env';
import { sendTx } from '@/lib/utils/sendTx';
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

  return new NextResponse(
    getFrameHtmlResponse({
      image: {
        src: `${env.NEXT_PUBLIC_URL}/api/images/success`
      },
      postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${params.chain_id}/${params.proposal_id}`
    })
  );

  // try {
  //   await sendTx({ fid: message.interactor.fid });

  //   return new NextResponse(
  //     getFrameHtmlResponse({
  //       buttons: [
  //         {
  //           label: 'For'
  //         },
  //         {
  //           label: 'Against'
  //         },
  //         {
  //           label: 'Abstain'
  //         },
  //         {
  //           label: 'Refresh'
  //         }
  //       ],
  //       image: {
  //         src: `${env.NEXT_PUBLIC_URL}/api/images/proposal/success`,
  //         aspectRatio: '1:1'
  //       },
  //       postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${params.chain_id}/${params.proposal_id}`
  //     })
  //   );
  // } catch (err) {
  //   console.log('err');
  //   return new NextResponse(
  //     getFrameHtmlResponse({
  //       image: {
  //         src: `${env.NEXT_PUBLIC_URL}/api/images/proposal/success`,
  //         aspectRatio: '1:1'
  //       },
  //       buttons: [
  //         {
  //           label: 'are weeee'
  //         }
  //       ]
  //       // postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${params.chain_id}/${params.proposal_id}`
  //     })
  //   );
  // }
}

export const dynamic = 'force-dynamic';
