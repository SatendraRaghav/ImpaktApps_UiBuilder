import { HTMLAttributes } from "react"
import { BoxProps } from "../ButtonWidget/interface"
import {  ReactNode } from "react"
export type TypographyColorScheme =
  | string
  | "white"
  | "blackAlpha"
  | "gray"
  | "grayBlue"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "cyan"
  | "purple"
  | "techPink"
  | "techPurple"

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface TextProps
  extends BaseProps,
    HTMLAttributes<HTMLSpanElement>,
    BoxProps {}

export interface ParagraphProps
  extends BaseProps,
    HTMLAttributes<HTMLParagraphElement>,
    BoxProps {
  indent?: boolean
}

export interface HeadingProps
  extends BaseProps,
    HTMLAttributes<HTMLHeadingElement>,
    BoxProps {
  level?: HeadingLevel
}

export interface BaseProps {
  children?: ReactNode
  colorScheme?: TypographyColorScheme
  ellipsis?: boolean 
  bold?: boolean
  disabled?: boolean
  mark?: boolean | TypographyColorScheme
  underline?: boolean
  deleted?: boolean
  code?: boolean
  copyable?: boolean 
}
export type HorizontalAlign = "start" | "center" | "end"
export type VerticalAlign = "start" | "center" | "end"

export interface ILLATextProps
  extends BaseProps,
    HTMLAttributes<HTMLSpanElement>,
    BoxProps {}
export interface TextProps extends ILLATextProps {
  value?: string
  disableMarkdown?: boolean
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
}

export interface TextWidgetProps
  extends Omit<TextProps, "h" | "w">,
    BaseProps {
  dynamicHeight?: "auto" | "fixed" | "limited"
  dynamicMaxHeight?: number
  dynamicMinHeight?: number
}
