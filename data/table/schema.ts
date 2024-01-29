import { z } from "zod";

export const proposalSchema = z.object({
  id: z.number(),
  proposer: z.string(),
  targets: z.array(z.string()),
  values: z.array(z.string()),
  signatures: z.array(z.string()),
  calldatas: z.array(z.string()),
  startBlock: z.string(),
  endBlock: z.string(),
  description: z.string(),
  state: z.string(),
});

export type proposal = z.infer<typeof proposalSchema>;
