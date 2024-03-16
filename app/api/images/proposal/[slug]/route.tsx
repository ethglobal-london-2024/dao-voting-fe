import { ImageResponse } from 'next/og';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundImage:
            'url(https://res.cloudinary.com/dwc808l7t/image/upload/v1709709855/game-launcher/background_gfb8pt.svg)'
        }}
      >
        <img
          src='https://res.cloudinary.com/dwc808l7t/image/upload/v1709710275/game-launcher/logo_t4edcj.svg'
          width='75px'
          height='75px'
          style={{
            position: 'absolute',
            top: '25px',
            left: '20px'
          }}
        />
        <p
          style={{
            color: '#76787A',
            width: '400px',
            fontSize: '28px',
            fontWeight: 400,
            marginTop: '100px',
            fontFamily: 'Inter Medium'
          }}
        >
          {/* <p>{proposal.title}</p>
          <p>{proposal.description}</p> */}
        </p>
      </div>
    )
  );
}
