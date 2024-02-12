import * as z from "zod";

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const formSchema = z.object({
  address: z.string().regex(ethAddressRegex, "Invalid Ethereum address"),
  networkId: z.string().refine(
    (data) => data !== "",
    { message: "Please select a network" }
  ),
});

export const voteSchema = z.object({
  vote: z.string().refine((data) => ["0", "1", "2"].includes(data), {
    message: "Please select a valid vote option",
  }),
});

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

export const statsSchema = z.array(
  z.object({
    title: z.string(),
    value: z.string(),
    unit: z.string(),
    description: z.string(),
  })
);

export const daoSchema = z.object({
  name: z.string(),
  networkId: z.number(),
  imageUrl: z.string(),
  ethAddress: z.string().regex(ethAddressRegex),
});
