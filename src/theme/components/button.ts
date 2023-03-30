/*
  TODO: revert type to ComponentSingleStyleConfig when this issue is resolved

  https://github.com/chakra-ui/chakra-ui/issues/5324
*/

const button = {
  baseStyle: {
    fontFamily: "DM Sans",
    fontWeight: "semibold",
    _disabled: {
      cursor: "not-allowed",
    },
  },
  sizes: {
    sm: {
      px: 3,
      py: 1,
      fontSize: "sm",
    },
    md: {
      py: 2,
      px: 4,
      fontSize: "sm",
    },
    lg: {
      py: 3,
      px: 6,
      fontSize: "sm",
    },
  },
  variants: {
    primary: {
      rounded: "md",
      color: "white",
      bg: "gray.700",
      border: "gray.700",
      _disabled: {
        opacity: 0.7,
        bg: "gray.700",
      },
      _hover: {
        bg: "gray.900",
        _disabled: {
          bg: "gray.900",
        },
      },
    },
    secondary: {
      rounded: "md",
      color: "gray.700",
      bg: "transparent",
      border: "gray.200",
      _disabled: {
        color: "gray.700",
        opacity: 0.7,
        bg: "gray.50",
      },
      _hover: {
        bg: "gray.50",
        color: "gray.900",
        border: "gray.900",
        _disabled: {
          bg: "gray.50",
        },
      },
    },
    tertiary: {
      rounded: "md",
      color: "gray.700",
      bg: "transparent",
      border: "none",
      _disabled: {
        color: "rgba(45, 55, 72, 0.7)",
      },
      _hover: {
        color: "gray.900",
        bg: "gray.100",
        _disabled: {
          bg: "transparent",
        },
      },
    },
    twitter: {
      rounded: "md",
      _hover: {
        bg: "external.twitterHover",
      },
      bg: "external.twitter",
      color: "white",
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
}

export default button
