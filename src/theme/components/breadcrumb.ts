import type { ComponentMultiStyleConfig } from "@chakra-ui/react"
import { breadcrumbAnatomy as parts } from "@chakra-ui/anatomy"
import type { PartsStyleObject } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
  item: {
    color: "gray.400",
  },
}

const breadcrumb: ComponentMultiStyleConfig = {
  parts: parts.keys,
  baseStyle,
}

export default breadcrumb
