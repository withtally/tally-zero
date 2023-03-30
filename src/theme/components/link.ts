import type { ComponentSingleStyleConfig } from "@chakra-ui/react"

const link: ComponentSingleStyleConfig = {
  baseStyle: {
    fontFamily: "DM Sans",
  },
  variants: {
    markdown: {
      color: "purple.500",
    },
    unstyled: {
      _focus: {
        textDecor: "none",
      },
      _hover: {
        textDecor: "none",
      },
    },
  },
}

export default link
