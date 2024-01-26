import * as z from "zod";

export const formSchema = z.object({
  // #TODO Ask for address conditions as well as networkid
  address: z.string(),
  networkId: z.string(),
});
