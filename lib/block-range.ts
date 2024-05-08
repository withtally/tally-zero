import { DAO } from "@config/schema";

export function getBlockRange(dao?: DAO) {
  if (dao && "maxBlockRange" in dao) {
    return dao.maxBlockRange;
  }
  return 50000;
}
