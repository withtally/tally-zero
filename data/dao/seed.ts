import fs from "fs";
import path from "path";
import { z } from "zod";

import { daoSchema } from "@config/schema";
import { ProposalState } from "@config/intial-state";

type DaoData = z.infer<typeof daoSchema>;

function generateFakeDaoData(): DaoData {
  return {
    name: `DAO-${Math.random().toString(36).substring(7)}`,
    imageUrl: `https://fakeimg.pl/250x250/?text=${Math.random()
      .toString(36)
      .substring(7)}`,
    proposalsSum: Math.floor(Math.random() * 300),
    holdersSum: Math.floor(Math.random() * 1000000) + 100,
    votersSum: Math.floor(Math.random() * 5000000) + 50,
    state:
      ProposalState[
        Math.floor((Math.random() * Object.keys(ProposalState).length) / 2)
      ].toLowerCase(),
    provider: {
      name: `Provider-${Math.random().toString(36).substring(7)}`,
      imageUrl: `https://fakeimg.pl/250x250/?text=${Math.random()
        .toString(36)
        .substring(7)}`,
    },
  };
}

const fakeDaos: DaoData[] = Array.from({ length: 30 }, generateFakeDaoData);

const filePath = path.join(__dirname, "daos.json");
fs.writeFileSync(filePath, JSON.stringify(fakeDaos, null, 2), "utf-8");

console.log(`Fake DAO data generated and saved to ${filePath}`);
