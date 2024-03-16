import { fetchProposalDocuments } from '@/lib/utils/fetcher';
import { ImageResponse } from 'next/og';

const logoMapping: { [key: number]: string } = {
  10: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png',
  8453: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-in-blue.png',
  42170: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png'
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
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
            // backgroundImage:
            //   'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)'
            backgroundColor: 'white'
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'space-around',
              paddingRight: 80,
              paddingLeft: 80
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
              src='https://cryptologos.cc/logos/optimism-ethereum-op-logo.png'
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
              marginTop: 100,
              marginLeft: 100
            }}
          >
            Successfully voted{' '}
            <span
              style={{ marginLeft: 6, color: '#AD20BD', fontWeight: 'bold' }}
            >
              For
            </span>
          </p>
        </div>
      )
    );
  } catch (err) {}
}
