import { logo_url } from '@/lib/utils';
import { fetchProposalDocuments } from '@/lib/utils/fetcher';
import { ImageResponse } from 'next/og';

const logoMapping: { [key: number]: string } = {
  10: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
  8453: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png',
  42170: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png'
};

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { chain_id: string; proposal_id: string } }
) {
  try {
    const response = await fetchProposalDocuments({
      chain_id: params.chain_id,
      proposal_id: params.proposal_id
    });
    const proposal = response.proposals[0];

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
            flexWrap: 'nowrap',
            background: 'white',
            paddingBottom: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              fontSize: 36,
              paddingLeft: 100,
              paddingRight: 100,
              marginBottom: 40
            }}
          >
            <p style={{ color: 'black', fontWeight: 800 }}>DAO PROPOSAL</p>
            {/* <div style={{ background: 'green', width: 30, height: 30 }}> */}
            <p
              style={{
                color: 'white',
                backgroundColor: 'green',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingRight: 15
              }}
            >
              ACTIVE
            </p>
            {/* </div> */}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontSize: 40,
              gap: 60,
              paddingLeft: 100,
              paddingRight: 100,
              height: '10%'
            }}
          >
            <img
              src='https://miro.medium.com/v2/resize:fit:2400/1*apIXKOfr7TglP83z7_rzWQ.jpeg'
              width={120}
              height={120}
            />
            <p
              style={{
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingRight: 15
              }}
            >
              LONG TERM INCENTIVE PILOT PROGRAM
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '40%',
              height: 200,
              paddingTop: 50,
              paddingBottom: 50
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                height: 45,
                fontSize: 32,
                gap: 70,
                width: '100%'
              }}
            >
              <p>Quorum</p>
              <p>{proposal.governor.quorum}</p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'green',
                height: 45,
                fontSize: 32,
                gap: 70,
                width: '100%'
              }}
            >
              <p>For</p>
              <p>
                {vote_for.votes} ({vote_for.percent}%)
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'red',
                height: 45,
                fontSize: 32,
                gap: 70,
                width: '100%'
              }}
            >
              <p style={{ textAlign: 'left' }}>Against</p>
              <p style={{ textAlign: 'right' }}>
                {vote_against.votes} ({vote_against.percent}%)
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'gray',
                height: 45,
                fontSize: 32,
                gap: 70,
                width: '100%'
              }}
            >
              <p>Abstain</p>
              <p>
                {vote_abstain.votes} ({vote_abstain.percent}%)
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              flex: 1,
              backgroundColor: '#03213D',
              marginTop: 100,
              alignItems: 'center',
              fontSize: 40,
              paddingLeft: 200,
              paddingRight: 200,
              justifyContent: 'space-between'
            }}
          >
            <img
              src='https://res.cloudinary.com/duhvlptwp/image/upload/v1710606145/logo_gwwonw.jpg'
              width={75}
              height={75}
            />
            <p
              style={{
                color: 'white',
                justifySelf: 'flex-end'
              }}
            >
              Cast Your Vote On Any Chain
            </p>
          </div>
        </div>
      ),
      {
        headers: { 'Content-type': 'image/jpeg' }
      }
    );
  } catch (err) {
    console.log('Catch err', err);
  }
}
