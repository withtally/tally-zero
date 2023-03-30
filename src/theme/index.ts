/* eslint-disable no-restricted-imports */
import { extendTheme } from "@chakra-ui/react"

import { styles } from "./styles"
import { colors } from "./foundations/colors"
import { fonts } from "./foundations/fonts"
import { borders } from "./foundations/borders"
import { spacing } from "./foundations/spacing"
import { textStyles } from "./foundations/textStyles"
import { layerStyles } from "./foundations/layerStyles"
import { shadows } from "./foundations/shadows"
import Tag from "./components/tag"
import Link from "./components/link"
import Code from "./components/code"
import Card from "./components/card"
import Stat from "./components/stat"
import Tabs from "./components/tabs"
import Input from "./components/input"
import Table from "./components/table"
import Modal from "./components/modal"
import Button from "./components/button"
import Avatar from "./components/avatar"
import Progress from "./components/progress"
import Skeleton from "./components/skeleton"
import Breadcrumb from "./components/breadcrumb"

const overrides = {
  styles,
  fonts,
  space: spacing,
  colors,
  borders,
  textStyles,
  layerStyles,
  shadows,
  components: {
    Button,
    Stat,
    Avatar,
    Skeleton,
    Link,
    Input,
    Tag,
    Code,
    Card,
    Modal,
    Tabs,
    Table,
    Breadcrumb,
    Progress,
  },
}

export default extendTheme(overrides)
