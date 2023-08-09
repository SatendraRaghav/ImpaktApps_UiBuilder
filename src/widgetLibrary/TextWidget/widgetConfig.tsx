import { ReactComponent as TextWidgetIcon}  from "@/assets/widgetCover/text.svg"
import { WidgetConfig } from "../interface" 
import { RESIZE_DIRECTION } from "../../page/app/components/componentPanel/interface"

export const TEXT_WIDGET_CONFIG: WidgetConfig = {
  displayName: "text",
  widgetName: "text",
  h: 5,
  w: 12,
  type: "TEXT_WIDGET",
  icon: <TextWidgetIcon />,
  keywords: ["Text", "文本"],
  sessionType: "PRESENTATION",
  resizeDirection: RESIZE_DIRECTION.HORIZONTAL,
  defaults: {
    value: "Hello Actians",
    horizontalAlign: "start",
    verticalAlign: "center",
    colorScheme: "grayBlue",
    disableMarkdown: false,
    hidden: false,
    fs: "14px",
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}