/*
  TODO: revert type to ComponentSingleStyleConfig when this issue is resolved

  https://github.com/chakra-ui/chakra-ui/issues/5324
*/

const code = {
  variants: {
    unstyled: {
      p: 0,
      bg: "transparent",
    },
  },
  defaultProps: {
    variant: "unstyled",
  },
}

export default code
