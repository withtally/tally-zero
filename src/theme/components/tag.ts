const parts = ["container", "label", "closeButton"]

/*
  TODO: revert type to ComponentMultiStyleConfig when this issue is resolved

  https://github.com/chakra-ui/chakra-ui/issues/5324
*/

const tag = {
  parts,
  baseStyle: {
    label: {
      fontFamily: "DM Sans",
    },
    container: {
      fontFamily: "DM Sans",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "wider",
      flex: "none",
    },
  },
  sizes: {
    sm: {
      container: {
        px: 1.5,
        py: 1,
        maxH: 5,
        fontSize: "xs",
        rounded: "sm",
      },
      label: {
        lineHeight: "0.5625em",
      },
    },
    md: {
      container: {
        px: 2,
        py: 1.5,
        maxH: 6,
        fontSize: "sm",
        rounded: "sm",
      },
      label: {
        lineHeight: "0.6875em",
      },
    },
    lg: {
      container: {
        px: 3,
        py: 2,
        maxH: 7,
        fontSize: "md",
        rounded: "sm",
      },
      label: {
        lineHeight: "0.75em",
      },
    },
  },
  defaultProps: {
    size: "sm",
    variant: "solid",
  },
}

export default tag
