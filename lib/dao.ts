import { DAO } from "@config/schema";
import daos from "../config/daos.json";

export const DEFAULT_MAX_BLOCK_RANGE = 50_000;
export function getBlockRange(dao?: DAO) {
  if (dao && "maxBlockRange" in dao) {
    return dao.maxBlockRange;
  }
  return DEFAULT_MAX_BLOCK_RANGE;
}

export function selectDAOByGovernorAddress(address?: string) {
  const dao = daos.find((dao) =>
    dao.ethAddresses.some(
      (ethAddress) => ethAddress.toLowerCase() === address?.toLowerCase()
    )
  );
  return dao;
}
