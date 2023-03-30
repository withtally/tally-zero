import { statAnatomy as parts } from "@chakra-ui/anatomy"
import type { PartsStyleObject } from "@chakra-ui/theme-tools"

const baseStyle: PartsStyleObject<typeof parts> = {
  container: {
    display: "flex",
  },
  number: {
    color: "gray.700",
    margin: "0 auto",
    fontSize: "sm",
    fontWeight: "semibold",
    lineHeight: "1.3125rem",
  },
  label: {
    color: "gray.500",
    fontStyle: "normal",
    fontWeight: 400,
    textStyle: "label",
    w: "max-content",
  },
}

const sizes: Record<string, PartsStyleObject<typeof parts>> = {
  sm: {
    label: { fontSize: "sm" },
    number: { fontSize: "lg" },
  },
}

const defaultProps = {
  size: "sm",
}

/*
  TODO: revert type to ComponentMultiStyleConfig when this issue is resolved

  https://github.com/chakra-ui/chakra-ui/issues/5324
*/

const modal = {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
}

export default modal
