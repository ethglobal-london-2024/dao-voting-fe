import { env } from '../config/env';

export const fetcher = ({ query, variables }: any) => {
  return fetch('https://api.tally.xyz/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': env.TALLY_API_KEY
    },
    body: JSON.stringify({
      query,
      variables
    })
  })
    .then((response) => response.json())
    .then((json) => {
      if (json?.errors) {
        console.error('error when fetching');

        return null;
      }

      return json.data;
    })
    .catch((error) => {
      console.log('Error when fetching =>', error);

      return null;
    });
};

export const fetchProposalDocuments = async ({
  chain_id,
  proposal_id
}: {
  chain_id: string;
  proposal_id: string;
}) => {
  const ProposalsDocument = `query Proposals($chainId: ChainID!, $proposalIds: [ID!], $pagination: Pagination, $sort: ProposalSort) {
      proposals(chainId: $chainId, proposalIds: $proposalIds, pagination: $pagination, sort: $sort) {
        id
        title
        eta
        governor {
          name
          quorum
          contracts {
            governor {
              address
              type
              lastBlock
            }
          }
        }
        voteStats {
          support
          weight
          votes
          percent
        }
      }
  }
      `;

  try {
    return await fetcher({
      query: ProposalsDocument,
      variables: {
        chainId: `eip155:${chain_id}`,
        proposalIds: [proposal_id],
        pagination: { limit: 1, offset: 0 },
        sort: { field: 'START_BLOCK', order: 'DESC' }
      }
    });
  } catch (err) {
    console.log('Error fetching proposal', err);
  }
};
