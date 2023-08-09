import React, { MutableRefObject, RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from "framer-motion"
import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import useMeasure from "react-use-measure"
import { useDrop } from 'react-dnd';
import { widgetBuilder } from '../../../../widgetLibrary/widgetBuilder';
import { applyComponentCanvasStyle, borderLineStyle } from './style';
import { PreviewPlaceholder } from './previewPlaceHolder';
import { PreviewColumnsChange } from './previewColumnChange';
import { Rnd } from "react-rnd";
import { DragInfo, DropCollectedInfo, DropResultInfo } from './interface';
import { ComponentNode } from './componentinterface';
import { getDragResult, isAddAction } from './calc';
import { useDispatch, useSelector } from 'react-redux';
import { getCanvas, getSectionChildren } from '@/redux/currentApp/editor/components/componentsSelector';
import { componentsActions } from '@/redux/currentApp/editor/components/componentsSlice';
import { cloneDeep } from 'lodash';
const UNIT_HEIGHT = 8;
const RenderComponentCanvas: FC<{
  componentNode?: ComponentNode
  containerRef: RefObject<HTMLDivElement>
  containerPadding: number
  minHeight?: number
  canResizeY?: boolean
  safeRowNumber: number
  blockColumns?: number
  addedRowNumber: number
  canAutoScroll?: boolean
  sectionName?: string
}> = (props) => {
  const {
    containerRef,
    containerPadding,
    minHeight,
    canResizeY = true,
    safeRowNumber,
    blockColumns = 64,
    addedRowNumber,
    canAutoScroll = false,
    sectionName,
  } = props
  const [canvasRef, bounds] = useMeasure()
  const [rowNumber, setRowNumber] = useState(0)
  const [xy, setXY] = useState([0, 0])
  const [lunchXY, setLunchXY] = useState([0, 0])
  const [canDrop, setCanDrop] = useState(true)
  const data1:any = useSelector(getSectionChildren);
  const dispatch = useDispatch()
  // console.log(data1.length)
  const currentCanvasRef = useRef<HTMLDivElement | null>(
    null,
  ) as MutableRefObject<HTMLDivElement | null>
 const [
    { isActive, nodeWidth, nodeHeight  }, 
    dropTarget] = useDrop<
    DragInfo,
    DropResultInfo & any,
    DropCollectedInfo & any
  >(
        () => ({
          accept: ["components"],
          hover: (dragInfo, monitor) => {
            // console.log(dragInfo)
            // if (monitor.isOver({ shallow: true }) && monitor.getClientOffset()) {
              const { item, currentColumnNumber } = dragInfo
              const scale = blockColumns / currentColumnNumber
    
              const scaleItem: ComponentNode = {
                ...item,
                w:
                  Math.ceil(item.w * scale) < item.minW
                    ? item.minW
                    : Math.ceil(item.w * scale),
              }
              const canResizeY = true;
              const containerPadding = 10;
              let dragResult
              if (
                
                isAddAction(
                  item.x,
                  item.y,
                  null,
                  "bodySection1-bodySectionContainer1",
                )
              ) {
               dragResult = getDragResult(
                  monitor,
                  containerRef,
                  scaleItem,
                  unitWidth,
                  UNIT_HEIGHT,
                  bounds.width,
                  "ADD",
                  bounds.height,
                  canResizeY,
                  containerPadding,
                  containerPadding,
                )
              } else {
                dragResult = getDragResult(
                  monitor,
                  containerRef,
                  item,
                  unitWidth,
                  UNIT_HEIGHT,
                  bounds.width,
                  "UPDATE",
                  bounds.height,
                  canResizeY,
                  containerPadding,
                  containerPadding,
                )
              }
              const { ladingPosition, rectCenterPosition } = dragResult
              const { landingX, landingY, 
                isOverstep 
              } = ladingPosition
              if (
                canResizeY &&
                landingY / UNIT_HEIGHT + item.h > rowNumber - safeRowNumber
              ) {
                const finalNumber = landingY / UNIT_HEIGHT + item.h + safeRowNumber
                setRowNumber(finalNumber)
              }
              // const childrenNodes = dragInfo.childrenNodes.filter(
              //   (node) => node.parentNode === componentNode?.displayName,
              // )
              // const indexOfChildrenNodes = childrenNodes.findIndex(
              //   (node) => node.displayName === item.displayName,
              // )
              // let finalChildrenNodes: ComponentNode[] = []
              // let finalEffectResultMap: Map<string, ComponentNode> = new Map()
              // /**
              //  * generate component node with new position
              //  */
              // const oldParentDisplayName = item.parentNode
              // const newItem = {
              //   ...scaleItem,
              //   parentNode: componentNode.displayName || "root",
              //   x: Math.round(landingX / unitWidth),
              //   y: Math.round(landingY / UNIT_HEIGHT),
              //   unitW: unitWidth,
              //   unitH: UNIT_HEIGHT,
              // }
              //  setCollisionEffect(finalEffectResultMap)
              setXY([rectCenterPosition.x, rectCenterPosition.y])
              setLunchXY([landingX, landingY])
              setCanDrop(
                // true
                isOverstep
                )
            // }
          },
          drop(dragInfo: any) {
            // layoutInfo: {
            //   x: newItem.x,
            //   y: newItem.y,
            //   w: newItem.w,
            //   h: newItem.h,
            //   unitW: newItem.unitW,
            //   unitH: newItem.unitH,
            // },
           const {item,currentColumnNumber} =cloneDeep( dragInfo);
           console.log(item)
           const currentAvailableWidget:ComponentNode[] = data1.filter((elem:ComponentNode)=>{
                 return elem.type === item.type
           })
           const itemCount = currentAvailableWidget.length+1;
           const scale = blockColumns / currentColumnNumber
           const scaleItem: ComponentNode = {
            ...item,
            w:
              Math.ceil(item.w * scale) < item.minW
                ? item.minW
                : Math.ceil(item.w * scale),
                displayName :item.displayName+itemCount,
                x :lunchXY[0],
                y : lunchXY[1],
                unitW : unitWidth,
                unitH : UNIT_HEIGHT,
          }
            

             dispatch(componentsActions.addComponentReducer(scaleItem))
             console.log(data1)
            return undefined;
          },
          collect: (monitor) => {
            const dragInfo = monitor.getItem()
            if (!dragInfo) {
              return {
                isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
                nodeWidth: 0,
                nodeHeight: 0,
              }
            }
            const { item, currentColumnNumber } = dragInfo
            let nodeWidth = item?.w ?? 0
            const nodeHeight = item?.h ?? 0
    
            nodeWidth =
              Math.ceil(nodeWidth * (blockColumns / currentColumnNumber)) <
              (item?.minW ?? 2)
                ? item?.minW ?? 2
                : Math.ceil(nodeWidth * (blockColumns / currentColumnNumber))
    
            return {
              isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
              nodeWidth: nodeWidth,
              nodeHeight: nodeHeight,
              isOver: monitor.isOver(),
              canDrop: monitor.canDrop(),
            }
          },
        }),[  bounds,
          bounds,
     
      UNIT_HEIGHT,
      canDrop,
          UNIT_HEIGHT,
          canDrop,
       ]
      );
     
      const unitWidth = useMemo(() => {
        return bounds.width / blockColumns
      }, [blockColumns, bounds.width])
      const maxY = useMemo(() => {
        
  
        return 0
      }, [])
    
      const finalRowNumber = useMemo(() => {
        return maxY
        //  Math.max(
        //   maxY,
        //   Math.floor((|| bounds.height) / UNIT_HEIGHT),
        // )
      }, [ maxY])
      useLayoutEffect(() => {
        if (!canDrop ) {
         
            if (
              finalRowNumber === maxY &&
              finalRowNumber + 40 >= rowNumber
            ) {
              setRowNumber(finalRowNumber + 40)
              // if (
              //   canAutoScroll &&
              //   rowNumber !== 0 &&
              //   finalRowNumber + addedRowNumber !== rowNumber
              // ) {
              //   clearTimeout(autoScrollTimeoutID.current)
              //   autoScrollTimeoutID.current = window.setTimeout(() => {
              //     containerRef.current?.scrollBy({
              //       top: (addedRowNumber * UNIT_HEIGHT) / 4,
              //       behavior: "smooth",
              //     })
              //   }, 60)
              // }
            } 
          } else {
            setRowNumber(maxY)
          }
      },[maxY,canDrop,finalRowNumber,rowNumber])
      const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    DragInfo,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: true,
      end: (draggedItem, monitor) => {
        const dropResultInfo = monitor.getDropResult()
        if (dropResultInfo) {
          window.alert("Alert ")
        }
        // endDrag(draggedItem.item, dropResultInfo?.isDropOnCanvas ?? false)
      },
      item: () => {
        // const rootState = store.getState()
        // const allComponentNodes = getFlattenArrayComponentNodes(rootState)
        // const executionResult = getExecutionResult(rootState)
        // let childrenNodes = allComponentNodes
        //   ? cloneDeep(allComponentNodes)
        //   : []
        // if (Array.isArray(childrenNodes)) {
        //   const mergedChildrenNode = batchMergeLayoutInfoToComponent(
        //     executionResult,
        //     childrenNodes,
        //   )
        //   childrenNodes = cloneDeep(mergedChildrenNode)
        // } else {
        //   childrenNodes = []
        // }
        // const itemLayoutInfo =
        //   executionResult[componentNode.displayName]?.$layoutInfo
        // const mergedItem: ComponentNode = mergeLayoutInfoToComponent(
        //   itemLayoutInfo,
        //   componentNode,
        // )
        // startDrag(mergedItem)
        return {
          item: mergedItem,
          childrenNodes,
          currentColumnNumber: blockColumns,
        }
      },
      collect: (monitor) => {
        return {
          isDragging: monitor.isDragging(),
        }
      },
    }),
    [ blockColumns],
  )
  return (
    <div
      // ref={drop}
      ref={(node) => {
        currentCanvasRef.current = node
        dropTarget(node)
        canvasRef(node)
      }}
      role="TargetBox"
      css={applyComponentCanvasStyle(
        bounds.width,
        bounds.height,
        bounds.width / blockColumns,
        UNIT_HEIGHT,
        isActive,
       600,
        
      )}
    >
     {data1.map((elem:any)=>{
      const obj = widgetBuilder(elem.type);
      const Component = obj.widget
      return(<>
      <Rnd
       bounds="parent"
    style={{ display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f0f0"}}
  // position={{
  //   x: elem.x,
  //     y: elem.y,
  // }}
  // size={{
  //   width: elem.w*elem.unitW,
  //   height: elem.h*elem.unitH
  // }}
    default={{
      x: elem.x,
      y: elem.y,
      // x: lunchXY[0],
      // y: lunchXY[1],
      // width: 200,
      // height: 50
      width: elem.w*elem.unitW,
      height: elem.h*elem.unitH
    }}
  >
    {/* <Resizable style={{border:"1px solid gray"}} defaultSize={{width:200,height:50}}> */}
    {/* <div > */}
  <Component ref={dragref}/>
  {/* </div> */}
  {/* </Resizable> */}
   </Rnd>
      </>)
     })}
       <PreviewPlaceholder
          x={xy[0]}
          y={xy[1]}
          lunchX={lunchXY[0]}
          lunchY={lunchXY[1]}
          w={nodeWidth * unitWidth}
          h={nodeHeight * UNIT_HEIGHT}
          canDrop={canDrop}
        />
    </div>
  )
}

export default RenderComponentCanvas