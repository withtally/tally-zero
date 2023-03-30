import type { ComponentMultiStyleConfig } from "@chakra-ui/react"

export type Dict = Record<string, unknown>

const parts = ["root", "tablist", "tab", "tabpanels", "tabpanel", "indicator"]

const tabs: ComponentMultiStyleConfig = {
  parts,
  variants: {
    line: ({ colorScheme: c }: Dict) => ({
      tab: {
        _selected: {
          color: `${c as string}.700`,
          borderColor: `${c as string}.700`,
        },
        py: 2,
        px: 3,
        color: "gray.400",
        fontSize: "md",
        fontWeight: "semibold",
        lineHeight: "1.313rem",
      },
    }),
  },
}

export default tabs
