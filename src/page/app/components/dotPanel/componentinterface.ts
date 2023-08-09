
export enum CONTAINER_TYPE {
    "EDITOR_DOT_PANEL" = "EDITOR_DOT_PANEL",
    "EDITOR_SCALE_SQUARE" = "EDITOR_SCALE_SQUARE",
    "EDITOR_PAGE_SQUARE" = "EDITOR_PAGE_SQUARE",
    "EDITOR_LAYOUT_SQUARE" = "EDITOR_LAYOUT_SQUARE",
  }
  
  export enum SECTION_POSITION {
    "TOP" = "TOP",
    "BOTTOM" = "BOTTOM",
    "CENTER" = "CENTER",
    "FULL" = "FULL",
    "NONE" = "NONE",
  }
  
  export interface ComponentNode {
    displayName: string
    parentNode: string | null
    showName: string
    isDragging: boolean
    isResizing: boolean
    childrenNode: ComponentNode[]
    type: string
    containerType: CONTAINER_TYPE
    verticalResize: boolean
    h: number
    w: number
    minH: number
    minW: number
    // default 0
    unitW: number
    // default 0
    unitH: number
    // default -1
    x: number
    // default -1
    y: number
    // default 0
    z: number
    props: {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
    } | null
  }
  
  export interface RootComponentNodeProps {
    currentPageIndex: number
    pageSortedKey: string[]
    homepageDisplayName?: string
  
    viewportWidth?: number
    viewportHeight?: number
  }
  
  export interface RootComponentNode extends ComponentNode {
    type: "DOT_PANEL"
    props: RootComponentNodeProps
  }
  
  export interface PageNodeProps {
    canvasSize: "auto" | "fixed"
    canvasWidth: number
    layout: string
    leftPosition: SECTION_POSITION
    rightPosition: SECTION_POSITION
    hasLeft: boolean
    hasRight: boolean
    hasHeader: boolean
    hasFooter: boolean
    isLeftFixed: boolean
    isRightFixed: boolean
    isHeaderFixed: boolean
    isFooterFixed: boolean
    leftWidth: number
    rightWidth: number
    topHeight: number
    bottomHeight: number
    showLeftFoldIcon: boolean
    showRightFoldIcon: boolean
    leftColumns?: number
    rightColumns?: number
    bodyColumns?: number
    headerColumns?: number
    footerColumns?: number
  }
  export interface PageNode extends ComponentNode {
    type: "PAGE_NODE"
    props: PageNodeProps
  }
  
  export interface SectionViewShape {
    viewDisplayName: string
    key: string
    id: string
    path: string
  }
  
  export interface BaseSectionNodeProps {
    currentViewIndex: number
    viewSortedKey: string[]
    sectionViewConfigs: SectionViewShape[]
    defaultViewKey: string
  }
  
  export interface LeftOrRightSectionNodeProps extends BaseSectionNodeProps {
    showFoldIcon: boolean
  }
  
  export type SectionNodeProps =
    | LeftOrRightSectionNodeProps
    | BaseSectionNodeProps
  
  export interface SectionNode extends ComponentNode {
    type: "SECTION_NODE"
    props: SectionNodeProps
  }
  
  export interface ModalSectionNodeProps {
    sortedKey?: string[]
    currentIndex?: number
  }
  
  export interface ModalSectionNode extends ComponentNode {
    type: "MODAL_SECTION_NODE"
    props: ModalSectionNodeProps
  }
  
  export type ComponentsState = ComponentNode | null
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  export  const ComponentsInitialState: ComponentsState|any = {
    "displayName": "root",
    "parentNode": "",
    "showName": "root",
    "error": false,
    "isDragging": false,
    "isResizing": false,
    "childrenNode": [
        {
            "displayName": "page1",
            "parentNode": "root",
            "showName": "page",
            "error": false,
            "isDragging": false,
            "isResizing": false,
            "childrenNode": [
                {
                    "displayName": "bodySection1",
                    "parentNode": "page1",
                    "showName": "bodySection",
                    "error": false,
                    "isDragging": false,
                    "isResizing": false,
                    "childrenNode": [
                        {
                            "displayName": "bodySection1-bodySectionContainer1",
                            "parentNode": "bodySection1",
                            "showName": "bodySection1-bodySectionContainer1",
                            "error": false,
                            "isDragging": false,
                            "isResizing": false,
                            "childrenNode": null,
                            "type": "CONTAINER_NODE",
                            "containerType": "EDITOR_DOT_PANEL",
                            "verticalResize": true,
                            "h": 0,
                            "w": 0,
                            "minH": 0,
                            "minW": 0,
                            "unitW": 0,
                            "unitH": 0,
                            "x": -1,
                            "y": -1,
                            "z": 0,
                            "props": {},
                            "panelConfig": null
                        }
                    ],
                    "type": "SECTION_NODE",
                    "containerType": "EDITOR_LAYOUT_SQUARE",
                    "verticalResize": true,
                    "h": 0,
                    "w": 0,
                    "minH": 0,
                    "minW": 0,
                    "unitW": 0,
                    "unitH": 0,
                    "x": -1,
                    "y": -1,
                    "z": 0,
                    "props": {
                        "currentViewIndex": 0,
                        "defaultViewKey": "View 1",
                        "sectionViewConfigs": [
                            {
                                "id": "8d043e68-7c45-446c-a51e-aa98ce541693",
                                "key": "View 1",
                                "path": "View 1",
                                "viewDisplayName": "bodySection1-bodySectionContainer1"
                            }
                        ],
                        "viewSortedKey": [
                            "bodySection1-bodySectionContainer1"
                        ]
                    },
                    "panelConfig": null
                },
                {
                    "displayName": "modalSection1",
                    "parentNode": "page1",
                    "showName": "modalSection",
                    "error": false,
                    "isDragging": false,
                    "isResizing": false,
                    "childrenNode": null,
                    "type": "MODAL_SECTION_NODE",
                    "containerType": "EDITOR_LAYOUT_SQUARE",
                    "verticalResize": true,
                    "h": 0,
                    "w": 0,
                    "minH": 0,
                    "minW": 0,
                    "unitW": 0,
                    "unitH": 0,
                    "x": -1,
                    "y": -1,
                    "z": 0,
                    "props": {},
                    "panelConfig": null
                }
            ],
            "type": "PAGE_NODE",
            "containerType": "EDITOR_PAGE_SQUARE",
            "verticalResize": true,
            "h": 0,
            "w": 0,
            "minH": 0,
            "minW": 0,
            "unitW": 0,
            "unitH": 0,
            "x": -1,
            "y": -1,
            "z": 0,
            "props": {
                "bodyColumns": 64,
                "bottomHeight": 0,
                "canvasSize": "auto",
                "canvasWidth": 100,
                "footerColumns": 64,
                "hasFooter": false,
                "hasHeader": false,
                "hasLeft": false,
                "hasRight": false,
                "headerColumns": 64,
                "isFooterFixed": true,
                "isHeaderFixed": true,
                "isLeftFixed": true,
                "isRightFixed": true,
                "layout": "default",
                "leftColumns": 16,
                "leftPosition": "NONE",
                "leftWidth": 0,
                "rightColumns": 16,
                "rightPosition": "NONE",
                "rightWidth": 0,
                "showLeftFoldIcon": false,
                "showRightFoldIcon": false,
                "topHeight": 0
            },
            "panelConfig": null
        }
    ],
    "type": "DOT_PANEL",
    "containerType": "EDITOR_DOT_PANEL",
    "verticalResize": true,
    "h": 0,
    "w": 0,
    "minH": 0,
    "minW": 0,
    "unitW": 0,
    "unitH": 0,
    "x": -1,
    "y": -1,
    "z": 0,
    "props": {
        "currentPageIndex": 0,
        "pageSortedKey": [
            "page1"
        ]
    },
    "panelConfig": null
  }
  export interface DeleteComponentNodePayload {
    displayNames: string[]
  }
  
  export interface DeletePageNodePayload {
    displayName: string
    originPageSortedKey: string[]
  }
  
  export interface sortComponentNodeChildrenPayload {
    parentDisplayName: string
    newChildrenNode: ComponentNode[]
  }
  
  export interface UpdateComponentPropsPayload {
    displayName: string
    updateSlice: Record<string, unknown>
  }
  export interface UpdateComponentDisplayNamePayload {
    displayName: string
    newDisplayName: string
  }
  
  export interface UpdateComponentReflowPayload {
    parentDisplayName: string
    childNodes: ComponentNode[]
  }
  
  export interface CopyComponentPayload {
    newComponentNode: ComponentNode
  }
  
  export interface UpdateTargetPageLayoutPayload {
    pageName: string
    layout: "default" | "presetA" | "presetB" | "presetC" | "presetD" | "presetE"
  }
  
  export interface UpdateTargetPagePropsPayload {
    pageName: string
    newProps: Partial<PageNodeProps>
    options?: Record<string, unknown>
  }
  
  export interface UpdateRootNodePropsPayload {}
  
  export interface DeleteTargetPageSectionPayload {
    pageName: string
    deleteSectionName:
      | "leftSection"
      | "rightSection"
      | "headerSection"
      | "footerSection"
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  options: Record<string, any>
  }
  
  export interface AddTargetPageSectionPayload {
    pageName: string
    addedSectionName:
      | "leftSection"
      | "rightSection"
      | "headerSection"
      | "footerSection"
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  options: Record<string, any>
  }
  
  export interface AddSectionViewPayload {
    parentNodeName: string
    containerNode: ComponentNode
    newSectionViewConfig: SectionViewShape
  }
  
  export interface DeleteSectionViewPayload {
    viewDisplayName: string
    parentNodeName: string
    originPageSortedKey: string[]
  }
  
  export interface UpdateSectionViewPropsPayload {
    parentNodeName: string
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  newProps: Record<string, any>
  }
  
  export interface AddModalComponentPayload {
    currentPageDisplayName: string
    modalComponentNode: ComponentNode
  }
  
  export interface UpdateComponentNodeHeightPayload {
    displayName: string
    height: number
    oldHeight: number
  }
  export interface SortComponentNodeChildrenPayload {
    parentDisplayName: string
    newChildrenNode: ComponentNode[]
  }