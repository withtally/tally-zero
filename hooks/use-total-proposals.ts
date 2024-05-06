import { UseTotalProposalsReturn } from "@/types/proposal"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

import OZGovernor_ABI from "@data/OzGovernor_ABI.json"

export const useTotalProposals = (
  governanceContractAddress: string
): UseTotalProposalsReturn => {
  const [totalProposals, setTotalProposals] = useState<number | null>(null)
  const [isLoadingTotal, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTotalProposals = async () => {
      try {
        const provider = ethers.providers.getDefaultProvider("mainnet")
        const governanceContract = new ethers.Contract(
          governanceContractAddress,
          OZGovernor_ABI,
          provider
        )

        const total = await governanceContract.proposalCount()
        setTotalProposals(total.toNumber())
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error("An unknown error occurred"))
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchTotalProposals()
  }, [governanceContractAddress, setTotalProposals, setIsLoading, setError])

  return { totalProposals, isLoadingTotal, error }
}
