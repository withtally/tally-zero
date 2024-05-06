import { daoSchema } from "@config/schema"

export function getBlockRange(dao: typeof daoSchema | undefined) {
  if (dao && "maxBlockRange" in dao) {
    return dao.maxBlockRange
  }
  return 50000
}
