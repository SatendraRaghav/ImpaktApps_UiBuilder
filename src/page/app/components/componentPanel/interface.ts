import { ReactNode } from "react"

export interface DraggableWrapperShape {
    w?: number
    h?: number
    x?: number
    y?: number
  }
  export enum RESIZE_DIRECTION {
    "ALL" = "ALL",
    "HORIZONTAL" = "HORIZONTAL",
    "VERTICAL" = "VERTICAL",
  }
  export interface BaseWidgetInfo {
    displayName?: string
    widgetName?: any
    icon?: ReactNode
    type: string
    containerType?: unknown
    sessionType?: unknown
    keywords?: string[]
    resizeDirection?: RESIZE_DIRECTION
  }

type defaultsType = () => Record<string, any>
export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
    id?: string
    childrenNode?: any
    defaults?: defaultsType | Record<string, any>
  }
  export interface ComponentItemProps extends WidgetCardInfo {}