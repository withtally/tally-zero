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
