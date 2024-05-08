import { z } from "zod";

import "dotenv/config";
import { DAO } from "../../config/schema";

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
export async function fetchDAOs() {
  const TALLY_API_KEY = z.string().parse(process.env.TALLY_API_KEY);
  const myHeaders = new Headers();

  myHeaders.append("accept", "*/*");
  myHeaders.append("accept-language", "en-US,en;q=0.9");
  myHeaders.append("api-key", TALLY_API_KEY);
  myHeaders.append("cache-control", "no-cache");
  myHeaders.append("content-type", "application/json");
  myHeaders.append("origin", "https://www.tally.xyz");
  myHeaders.append("pragma", "no-cache");
  myHeaders.append("priority", "u=1, i");
  myHeaders.append("referer", "https://www.tally.xyz/");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="124", "Brave";v="124", "Not-A.Brand";v="99"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"macOS"');
  myHeaders.append("sec-fetch-dest", "empty");
  myHeaders.append("sec-fetch-mode", "cors");
  myHeaders.append("sec-fetch-site", "same-site");
  myHeaders.append("sec-gpc", "1");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  );

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

  console.log("len: ", organizations.length);
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
  const imageUrl = `https://www.tally.xyz/_next/image?url=https%3A%2F%2Fstatic.tally.xyz%2F${imageId}&w=256&q=75`;
  return {
    name,
    networkId: Number(networkId),
    imageUrl,

    ethAddresses,
    maxBlockRange: customMaxBlockRanges[name] || 50_000,
  };
}
