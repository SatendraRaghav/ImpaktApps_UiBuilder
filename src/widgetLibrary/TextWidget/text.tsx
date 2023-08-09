import { FC, useState } from "react"

import { TextProps, TextWidgetProps } from "./interface"
// import {
//   applyAlignStyle,
//   applyAutoHeightContainerStyle,
//   applyMarkdownStyle,
// } from "./style"
import { TextField } from "@mui/material"

export const Text: FC<TextProps> = (props) => {
  const {
    value,
    // horizontalAlign,
    // verticalAlign,
    // colorScheme,
    // fs,
    // disableMarkdown,
  } = props
  const [input,setInput] = useState(value)
  return (
    // <div css={applyAlignStyle(verticalAlign)}>
    <TextField
    variant="standard"
    type="text"
    fullWidth
    color="primary"
    value={input}
    onChange={(e)=>setInput(e.target.value)}
    label="Textfield"
    />
  
    // </div>
  )
}

Text.displayName = "Text"

export const TextWidget: FC<TextWidgetProps> = (
    // props
    ) => {
//   const {
//     value,
//     horizontalAlign,
//     verticalAlign = "start",
//     displayName,
//     handleUpdateDsl,
//     handleUpdateGlobalData,
//     handleDeleteGlobalData,
//     updateComponentHeight,
//     disableMarkdown,
//     tooltipText,
//     dynamicHeight = "fixed",
//     dynamicMinHeight,
//     dynamicMaxHeight,
//     colorScheme,
//     fs,
//     h = 0,
//   } = props


  return (
 
        <Text
        value="Hello Actians"
        
        //   horizontalAlign={horizontalAlign}
        //   value={value}
        //   verticalAlign={verticalAlign}
        //   colorScheme={colorScheme}
        //   fs={fs}
        //   disableMarkdown={disableMarkdown}
        />
  )
}

TextWidget.displayName = "TextWidget"