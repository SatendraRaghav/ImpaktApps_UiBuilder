import { ReactComponent as ButtonWidgetIcon}  from "@/assets/widgetCover/button.svg"
// import i18n from "@/i18n/config"
import { WidgetConfig } from "../interface"

export const BUTTON_WIDGET_CONFIG: WidgetConfig = {
  type: "BUTTON_WIDGET",
  displayName: "button",
  widgetName:"button",
//    i18n.t("widget.button.name"),
  keywords: ["Button", "按钮"],
  icon: <ButtonWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 12,
  h: 5,
  defaults: {
    text: "button",
    // i18n.t("widget.button.default_text"),
    variant: "fill",
    colorScheme: "blue",
    hidden: false,
  },
}