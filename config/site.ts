import type { SiteConfig } from "@types";
import path from "path";

const url = "https://zero.tally.xyz";
export const siteConfig = {
  name: "Tally Zero",
  description: "A decentralized zero dependency voting client",
  url,
  ogImage: path.join(url, "og.png"),
  links: {
    twitter: "https://twitter.com/tallyxyz",
    github: "https://github.com/withtally/tally-zero",
  },
  manifest: path.join(url, "site.webmanifest"),
} as const satisfies SiteConfig;
