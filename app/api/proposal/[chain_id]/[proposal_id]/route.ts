import { env } from '@/lib/config/env';
import { fetchProposalDocuments } from '@/lib/utils/fetcher';
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

  try {
    const response = await fetchProposalDocuments({
      chain_id: params.chain_id,
      proposal_id: params.proposal_id
    });
    const proposal = response.proposals[0];

    sendTx({
      fid: message.interactor.fid,
      contract_address: proposal.governor.contracts.governor.address,
      button_index: message.button,
      proposal_id: params.proposal_id
    });

    return new NextResponse(
      getFrameHtmlResponse({
        image: {
          src: `${env.NEXT_PUBLIC_URL}/api/images/success`
        },
        postUrl: `${env.NEXT_PUBLIC_URL}/api/proposal/${params.chain_id}/${params.proposal_id}`
      })
    );
  } catch (err) {
    console.log('err', err);
  }
}

export const dynamic = 'force-dynamic';
