import { env } from '@/lib/config/env';
import { logo_url } from '@/lib/utils';
import { fetchProposalDocuments } from '@/lib/utils/fetcher';
import { ImageResponse } from 'next/og';

const logoMapping: { [key: number]: string } = {
  10: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
  8453: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png',
  42170: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png'
};

export async function GET(
  request: Request,
  { params }: { params: { chain_id: string; proposal_id: string } }
) {
  try {
    const response = await fetchProposalDocuments({
      proposal_id: params.proposal_id
    });
    const proposal = response.proposals[0];

    const logo = logoMapping[Number(params.chain_id)];

    const vote_for = proposal.voteStats.find((e: any) => e.support === 'FOR');
    const vote_against = proposal.voteStats.find(
      (e: any) => e.support === 'AGAINST'
    );
    const vote_abstain = proposal.voteStats.find(
      (e: any) => e.support === 'ABSTAIN'
    );

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
            flexWrap: 'nowrap'
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'space-around',
              paddingRight: 70,
              paddingLeft: 70
            }}
          >
            <img
              src='https://res.cloudinary.com/duhvlptwp/image/upload/v1710606145/logo_gwwonw.jpg'
              alt='logo'
              style={{
                borderRadius: 50,
                width: 100,
                marginTop: 10,
                marginLeft: 10
              }}
            />
            <img
              src={logo}
              alt='logo'
              style={{
                width: 100,
                marginTop: 10,
                marginRight: 10
              }}
            />
          </div>
          <p
            style={{
              color: 'white',
              width: '400px',
              fontSize: '28px',
              fontWeight: 400,
              fontFamily: 'Inter Medium',
              marginTop: 100
            }}
          >
            # [SIP-5] - Seamless Protocol Native USDC Reward Incentives
          </p>
          <p style={{ color: 'white', fontSize: 20 }}>
            Governor name: Seamless Protocol
          </p>
          <p style={{ color: 'white', fontSize: 20 }}>Quorum: 0</p>
          <p style={{ color: 'white', fontSize: 20 }}>For: 20 - 100%</p>
          <p style={{ color: 'white', fontSize: 20 }}>Against: 0 - 0%</p>
          <p style={{ color: 'white', fontSize: 20 }}>Abstain: 3 - 1%</p>
        </div>
      )
    );
  } catch (err) {}
}
