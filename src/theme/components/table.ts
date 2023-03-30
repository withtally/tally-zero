import type { ComponentMultiStyleConfig } from "@chakra-ui/react"

const parts = ["table", "thead", "tbody", "tr", "th", "td", "caption"]

const table: ComponentMultiStyleConfig = {
  parts,
  baseStyle: {
    th: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "normal",
      lineHeight: "1.125rem",
      color: "gray.600",
      minWidth: 40,
      textTransform: "none",
    },
  },
}

export default table
