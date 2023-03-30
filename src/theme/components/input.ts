import type { ComponentSingleStyleConfig } from "@chakra-ui/react"

const input: ComponentSingleStyleConfig = {
  sizes: {
    lg: {
      field: {
        rounded: "sm",
      },
    },
    md: {
      field: {
        rounded: "sm",
      },
    },
  },
  variants: {
    presentational: {
      field: {
        bg: "gray.50",
        border: "gray.dark",
        color: "gray.500",
        pointerEvents: "none",
        rounded: "sm",
      },
    },
  },
}

export default input
