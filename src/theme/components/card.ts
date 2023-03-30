import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    backgroundColor: "white",
    marginTop: "10px",
    marginBottom: "8px",
    borderColor: "gray.200"
  },
  header: {
    paddingTop: '2em',
    paddingBottom: '1em',
  },
  footer: {
    paddingTop: '2px',
  },
})

const cardTheme = defineMultiStyleConfig({ baseStyle })

export default cardTheme