import { env } from '@/lib/config/env';
import { fetchProposalDocuments } from '@/lib/utils/fetcher';
import { ImageResponse } from 'next/og';

export async function GET(
  request: Request,
  { params }: { params: { chain_id: string; proposal_id: string } }
) {
  const response = await fetchProposalDocuments({
    proposal_id: params.proposal_id
  });

  const proposal = response.proposals[0];

  console.log(proposal);

  const voteFor = proposal.voteStats.find((e: any) => e.support === 'FOR');
  const voteAgainst = proposal.voteStats.find(
    (e: any) => e.support === 'AGAINST'
  );
  const voteAbstain = proposal.voteStats.find(
    (e: any) => e.support === 'ABSTAIN'
  );

  const logoSrc = `${env.NEXT_PUBLIC_URL}/logo.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundImage:
            'url(https://res.cloudinary.com/dwc808l7t/image/upload/v1709709855/game-launcher/background_gfb8pt.svg)'
        }}
      >
        <img src={logoSrc} width={30} height={30} alt='logo' />
        <p
          style={{
            color: 'white',
            width: '400px',
            fontSize: '28px',
            fontWeight: 400,
            marginTop: '100px',
            fontFamily: 'Inter Medium'
          }}
        >
          {proposal.title}
        </p>
        <p style={{ color: 'white', fontSize: 30 }}>
          Governor name: {proposal.governor.name}
        </p>
        <p style={{ color: 'white', fontSize: 30 }}>
          Quorum: {proposal.governor.quorum}
        </p>
        <p style={{ color: 'white', fontSize: 30 }}>
          For: {voteFor.votes} - {voteFor.percent}%
        </p>
        <p style={{ color: 'white', fontSize: 30 }}>
          Against: {voteAgainst.votes} - {voteAgainst.percent}%
        </p>
        <p style={{ color: 'white', fontSize: 30 }}>
          Abstain: {voteAbstain.votes} - {voteAbstain.percent}%
        </p>
      </div>
    )
  );
}
