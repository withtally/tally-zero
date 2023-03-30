import type { ComponentMultiStyleConfig } from "@chakra-ui/react"
import { modalAnatomy as parts } from "@chakra-ui/anatomy"

const modal: ComponentMultiStyleConfig = {
  parts: parts.keys,
  baseStyle: {
    dialog: {
      rounded: "10px",
    },
  },
}

export default modal
