import { FC, ReactNode } from "react"
export enum RESIZE_DIRECTION {
    "ALL" = "ALL",
    "HORIZONTAL" = "HORIZONTAL",
    "VERTICAL" = "VERTICAL",
  }
  export interface DraggableWrapperShape {
    w: number
    h: number
    x?: number
    y?: number
  }
export interface BaseWidgetInfo {
    displayName: string
    widgetName: any
    icon: ReactNode
    type: string
    containerType?: any
    sessionType?: any
    keywords?: string[]
    resizeDirection?: RESIZE_DIRECTION
  }
  type defaultsType = () => Record<string, any>
export interface WidgetCardInfo extends DraggableWrapperShape, BaseWidgetInfo {
    id: string
    childrenNode?: Omit<WidgetConfig, "icon" | "keywords" | "sessionType">[]
    defaults?: defaultsType | Record<string, any>
  }
export type WidgetConfig = Omit<WidgetCardInfo, "id">
export interface WidgetConfigs {
    [key: string]: {
      widget: FC<any>
      config: WidgetConfig
    //   panelConfig: PanelConfig[]
    //   eventHandlerConfig?: EventHandlerConfig
    }
  }

  
export interface EventsInProps {
    script: string
    eventType: string
    enabled?: string
  }
  
  export interface BaseWidgetProps {
    displayName: string
    // childrenNode: ComponentNode[]
    childrenNode: any[]
    handleUpdateGlobalData: (key: string, value: any) => void
    handleDeleteGlobalData: (key: string) => void
    handleUpdateDsl: (value: any) => void
    handleUpdateMultiExecutionResult: (
      updateSlice: {
        displayName: string
        value: Record<string, any>
      }[],
    ) => void
    updateComponentHeight: (newHeight: number) => void
    handleUpdateOriginalDSLMultiAttr: (updateSlice: Record<string, any>) => void
    triggerEventHandler: (
      eventType: string,
      path?: string,
      otherCalcContext?: Record<string, any>,
      formatPath?: (path: string) => string,
    ) => void
    triggerMappedEventHandler: (
      eventType: string,
      path: string,
      index?: number,
    ) => void
    w: number
    h: number
    unitW: number
    unitH: number
  }
  
  export interface BaseComponentNodeProps {
    w: number
    h: number
    unitW: number
    unitH: number
  }
  