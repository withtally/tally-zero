import * as z from "zod";

const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

export const formSchema = z.object({
  address: z
    .string()
    .regex(ethAddressRegex, { message: "Invalid Ethereum address" }),
  networkId: z.string().refine((data) => !isNaN(Number(data)), {
    message: "Network ID must be numeric",
  }),
});

export const voteSchema = z.object({
  vote: z
    .string()
    .refine((data) => ["for", "against", "abstrain"].includes(data), {
      message: "Please select a valid vote option",
    }),
});
