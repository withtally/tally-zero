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
const apiResponseSchema = z.object({
  nodes: z.array(organizationSchema),
  pageInfo: z.object({
    lastCursor: z.string(),
  }),
});

function fetchOrganizations(firstCursor: string | null = null) {
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
		pageInfo {
			lastCursor
		}
	  }
	}
	`,
    variables: {
      input: {
        sort: { isDescending: true, sortBy: "EXPLORE" },
        filters: { hasLogo: true },
        page: {
          limit: 99999,
          ...(firstCursor && { afterCursor: firstCursor }),
        },
      },
    },
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  } as any;
  return fetch("https://api.tally.xyz/query", requestOptions)
    .then((response) => response.json())
    .then((res) => res.data.organizations)
    .then((data) => {
      return data;
    })
    .then(apiResponseSchema.parse);
}
/**
 * Fetch top DAOs from Tally.
 */
export async function fetchDAOs() {
  let organizations: z.infer<typeof organizationSchema>[] = [];
  console.log("Fetching organizations...");
  let organizationResponse = await fetchOrganizations();
  organizations = organizations.concat(organizationResponse.nodes);

  do {
    organizationResponse = await fetchOrganizations(
      organizationResponse.pageInfo.lastCursor
    );
    organizations = organizations.concat(organizationResponse.nodes);
  } while (organizationResponse.pageInfo.lastCursor);

  const daos = organizations
    .filter((organization) => organization.delegatesCount > 75)
    .sort((a, b) => b.delegatesCount - a.delegatesCount)
    .map(formatAsDAO);
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
