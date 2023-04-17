import type { ComponentMultiStyleConfig } from "@chakra-ui/react"

const parts = ["table", "thead", "tbody", "tr", "th", "td", "caption"]

const table: ComponentMultiStyleConfig = {
  parts,
  baseStyle: ({ colorMode }) => ({
    th: {
      fontFamily: "body",
      fontSize: "xs",
      fontWeight: "normal",
      lineHeight: "1.125rem",
      color: colorMode === "dark" ? "gray.600" : "white",
      minWidth: 40,
      textTransform: "none",
    },
  }),
}

export default table
