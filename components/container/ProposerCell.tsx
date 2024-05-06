import { Addreth, AddrethConfig } from "addreth"
import { useTheme } from "next-themes"

export function ProposerCell({ proposer }: { proposer: string }) {
  const { theme } = useTheme()

  return (
    <AddrethConfig>
      <Addreth
        ens={false}
        // @ts-ignore: It's already 0x-prefixed
        address={`${proposer}`}
        theme={theme === "dark" ? "dark" : "light"}
      />
    </AddrethConfig>
  )
}
