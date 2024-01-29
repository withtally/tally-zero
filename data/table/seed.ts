import fs from "fs";
import path from "path";

import { ParsedProposal } from "@/types/proposal";
import { ProposalState } from "@config/intial-state";

const generateFakeProposal = (): ParsedProposal => {
  return {
    id: Math.floor(Math.random() * 1000),
    proposer: `0x${Math.random().toString(16).slice(2, 10)}`,
    targets: [`0x${Math.random().toString(16).slice(2, 10)}`],
    values: [Math.random().toString()],
    signatures: [`signature${Math.random().toString(16).slice(2, 6)}`],
    calldatas: [`calldata${Math.random().toString(16).slice(2, 6)}`],
    startBlock: Math.floor(Math.random() * 10000).toString(),
    endBlock: Math.floor(Math.random() * 10000 + 10000).toString(),
    description: `This is a fake proposal description.`,
    state:
      ProposalState[
        Math.floor((Math.random() * Object.keys(ProposalState).length) / 2)
      ],
  };
};

const fakeProposals: ParsedProposal[] = Array.from(
  { length: 30 },
  generateFakeProposal
);

fs.writeFileSync(
  path.join(__dirname, "proposals.json"),
  JSON.stringify(fakeProposals, null, 2)
);

console.log("Fake proposals generated.");
