import { WidgetConfigs } from "./interface";
import { ButtonWidget } from "./ButtonWidget";
import { BUTTON_WIDGET_CONFIG } from "./ButtonWidget";
import { TextWidget } from "./TextWidget/text";
import { TEXT_WIDGET_CONFIG } from "./TextWidget/widgetConfig";

export const WidgetConfig: WidgetConfigs = {
  BUTTON_WIDGET: {
        widget: ButtonWidget,
        config: BUTTON_WIDGET_CONFIG,
        // panelConfig: TEXT_PANEL_CONFIG,
        // eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
      },  
      TEXT_WIDGET: {
        widget: TextWidget,
        config: TEXT_WIDGET_CONFIG,
        // panelConfig: TEXT_PANEL_CONFIG,
        // eventHandlerConfig: TEXT_EVENT_HANDLER_CONFIG,
      }, 
}
export type WidgetType = keyof typeof WidgetConfig
export const WidgetTypeList = Object.keys(WidgetConfig)
export const widgetBuilder = (type: WidgetType) => {
  return WidgetConfig[type]
}