"use client"

import { ethers } from "ethers"
import { useEffect, useState } from "react"

import OZGovernor_ABI from "@data/OzGovernor_ABI.json"

export const useTotalVotes = ({
  userAddress,
  governanceContractAddress,
}: {
  userAddress: string | null
  governanceContractAddress: string
}) => {
  const [totalVotes, setTotalVotes] = useState<number | null>(null)
  const [isLoadingVote, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTotalVotes = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(
            window.ethereum as ethers.providers.ExternalProvider
          )
          const contract = new ethers.Contract(
            governanceContractAddress,
            OZGovernor_ABI,
            provider
          )

          const votes = await contract.getTotalVotes(userAddress)
          setTotalVotes(votes.toNumber())
        } catch (err) {
          console.error(err)
          setError(err as Error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setError(new Error("Ethereum wallet is not available"))
        setIsLoading(false)
      }
    }

    if (userAddress) {
      fetchTotalVotes()
    }
  }, [
    userAddress,
    governanceContractAddress,
    setTotalVotes,
    setIsLoading,
    setError,
  ])

  return { totalVotes, isLoadingVote, error }
}
