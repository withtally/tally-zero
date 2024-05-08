import { z } from "zod";

import "dotenv/config";
import { DAO } from "../../config/schema";
import { DEFAULT_MAX_BLOCK_RANGE } from "../../lib/dao";

const customMaxBlockRanges: Record<string, number> = {
  Arbitrum: 100_000,
  Optimism: 100_000,
};
const organizationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  delegatesCount: z.number().int(),
  governorIds: z.array(z.string()),
  metadata: z.object({
    icon: z.string(),
  }),
});
/**
 * Fetch top DAOs from Tally.
 */
export async function fetchDAOs() {
  const TALLY_API_KEY = z.string().parse(process.env.TALLY_API_KEY);
  const myHeaders = new Headers();

  myHeaders.append("api-key", TALLY_API_KEY);
  myHeaders.append("content-type", "application/json");

  const graphql = JSON.stringify({
    query: `query ExploreOrgs($input: OrganizationsInput!) {
	organizations(input: $input) {
	  nodes {
		... on Organization {
		  slug
		  name
		  delegatesCount
		  governorIds
		  metadata {
			icon
		  }
		}
	  }
	}
  }
  `,
    variables: {
      input: {
        sort: { isDescending: true, sortBy: "EXPLORE" },
        filters: { hasLogo: true },
        page: { limit: 99999 },
      },
    },
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  } as any;

  const organizations = await fetch(
    "https://api.tally.xyz/query",
    requestOptions
  )
    .then((response) => response.json())
    .then((res) => res.data.organizations.nodes)
    .then(z.array(organizationSchema).parse)
    .then((organizations) =>
      organizations.sort((a, b) => b.delegatesCount - a.delegatesCount)
    );

  const daos = organizations.map(formatAsDAO);
  return daos;
}

function formatAsDAO(organization: z.infer<typeof organizationSchema>): DAO {
  const name = organization.name;
  const networkId = organization.governorIds[0].split(":")[1];
  const ethAddresses = organization.governorIds.map((governorId) =>
    governorId.split(":")[2].toLowerCase()
  );
  const imageId = organization.metadata.icon.replace(
    "https://static.tally.xyz/",
    ""
  );
  // these images are already optimized for size better than the originals
  const imageUrl = `https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F${imageId}&w=256&q=75`;
  return {
    name,
    networkId: Number(networkId),
    imageUrl,

    ethAddresses,
    maxBlockRange: customMaxBlockRanges[name] || DEFAULT_MAX_BLOCK_RANGE,
  };
}
