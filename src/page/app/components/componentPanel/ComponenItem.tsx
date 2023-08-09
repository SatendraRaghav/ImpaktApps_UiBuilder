import  { FC, useState } from 'react'
import { ComponentItemProps } from './interface'
import { useDrag } from "react-dnd"
import {
  dragPreviewStyle,
  iconStyle,
  itemContainerStyle,
  nameStyle,
} from "./style"

const ComponentItem:FC<ComponentItemProps>  = (props: ComponentItemProps) => {
  const {  icon,widgetName } = props;
  const [isEditMode] = useState(true);
  const [, dragRef, dragPreviewRef] = useDrag<any>(
      () => ({
        type: "components",
        canDrag: () => {
          return isEditMode
        },
        item: () => {
          return {item:props, childrenNodes:[],
            currentColumnNumber: 64,} 
        },
      }),
      [isEditMode],
    )

  return (
    <div css={itemContainerStyle} ref={dragRef}>
        <div css={dragPreviewStyle} ref={dragPreviewRef} />
        <span css={iconStyle}>{icon}</span>
        <span css={nameStyle}>{widgetName}</span>
      </div>
  )
}

export default ComponentItem;