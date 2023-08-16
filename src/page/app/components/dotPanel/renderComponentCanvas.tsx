import  {
  FC,
  MutableRefObject,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import useMeasure from "react-use-measure";
import { useDrop } from "react-dnd";
import { applyComponentCanvasStyle } from "./style";
import { PreviewPlaceholder } from "./previewPlaceHolder"
import { DragInfo, DropCollectedInfo, DropResultInfo } from "./interface";
import { ComponentNode } from "./componentinterface";
import { getDragResult, isAddAction } from "./calc";
import { useDispatch, useSelector } from "react-redux";
import {
  getSectionChildren,
} from "@/redux/currentApp/editor/components/componentsSelector";
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice";
import { cloneDeep } from "lodash";
import { ScaleSquare } from "../scaleSquare";
const UNIT_HEIGHT = 8;
const RenderComponentCanvas: FC<{
  componentNode?: ComponentNode;
  containerRef: RefObject<HTMLDivElement>;
  containerPadding: number;
  minHeight?: number;
  canResizeY?: boolean;
  safeRowNumber: number;
  blockColumns?: number;
  addedRowNumber: number;
  canAutoScroll?: boolean;
  sectionName?: string;
}> = (props) => {
  const {
    containerRef,
    // containerPadding,
    // minHeight,
    // canResizeY = true,
    safeRowNumber,
    blockColumns = 64,
    // addedRowNumber,
    // canAutoScroll = false,
    // sectionName,
  } = props;
  const [canvasRef, bounds] = useMeasure();
  const [rowNumber, setRowNumber] = useState(0);
  const [xy, setXY] = useState([0, 0]);
  const [lunchXY, setLunchXY] = useState([0, 0]);
  const [canDrop, setCanDrop] = useState(true);
  const data1: ComponentNode[] = useSelector(getSectionChildren);
  const dispatch = useDispatch();
  // console.log(data1.length)
  const currentCanvasRef = useRef<HTMLDivElement | null>(
    null
  ) as MutableRefObject<HTMLDivElement | null>;
  const [{ isActive, nodeWidth, nodeHeight }, dropTarget] = useDrop<
    DragInfo,
    DropResultInfo ,
    DropCollectedInfo & any
  >(
    () => ({
      accept: ["components"],
      hover: (dragInfo, monitor) => {
        const { item, currentColumnNumber } = dragInfo;
        const scale = blockColumns / currentColumnNumber;
        const scaleItem: ComponentNode = {
          ...item,
          w:
            Math.ceil(item.w * scale) < item.minW
              ? item.minW
              : Math.ceil(item.w * scale),
        };
        const canResizeY = true;
        const containerPadding = 10;
        let dragResult;
        if (
          isAddAction(
            item.x,
            item.y,
            null,
            "bodySection1-bodySectionContainer1"
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
            containerPadding
          );
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
            containerPadding
          );
        }
        const { ladingPosition, rectCenterPosition } = dragResult;
        const { landingX, landingY, isOverstep } = ladingPosition;
        if (
          canResizeY &&
          landingY / UNIT_HEIGHT + item.h > rowNumber - safeRowNumber
        ) {
          const finalNumber = landingY / UNIT_HEIGHT + item.h + safeRowNumber;
          setRowNumber(finalNumber);
        }
        setXY([rectCenterPosition.x, rectCenterPosition.y]);
        setLunchXY([landingX, landingY]);
        setCanDrop(
          isOverstep
        );
      },
      drop(dragInfo: any,monitor) {
        const { item, currentColumnNumber } = cloneDeep(dragInfo);
       const dragResult = getDragResult(
          monitor,
          containerRef,
          item,
          unitWidth,
          UNIT_HEIGHT,
          bounds.width,
          "UPDATE",
          bounds.height,
          true,
          10,
          10
        );
        const { ladingPosition } = dragResult
        const { landingX, landingY } = ladingPosition
        console.log(item);
        let finalData: ComponentNode[]  = data1;
        let  isAreadyAvailable:boolean = false;
        let indexOfCom:number= -1 ;
         data1.map((elem,i:number)=>{
            if(elem.displayName === item.displayName){
              isAreadyAvailable = true
              indexOfCom = i
            }
        })
        const currentAvailableWidget: ComponentNode[] = data1.filter(
          (elem: ComponentNode) => {
           return elem.type === item.type
          });
        const itemCount = currentAvailableWidget.length + 1;
        const scale = blockColumns / currentColumnNumber;
        const scaleItem: ComponentNode = {
          ...item,
          w:
            Math.ceil(item.w * scale) < item.minW
              ? item.minW
              : Math.ceil(item.w * scale),
          displayName: isAreadyAvailable?item.displayName:item.displayName + itemCount,
          // x: lunchXY[0],
          // y: lunchXY[1],
          x: Math.round(landingX / unitWidth),
          y: Math.round(landingY / UNIT_HEIGHT),
          unitW: unitWidth,
          unitH: UNIT_HEIGHT,
        };
       if(isAreadyAvailable){
         finalData[indexOfCom] = scaleItem;
       }else{
        finalData = [...finalData,scaleItem]
       }
        dispatch(componentsActions.addComponentReducer(finalData));
        console.log(data1);
        return undefined;
      },
      collect: (monitor) => {
        const dragInfo = monitor.getItem();
        if (!dragInfo) {
          return {
            isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
            nodeWidth: 0,
            nodeHeight: 0,
          };
        }
        const { item, currentColumnNumber } = dragInfo;
        let nodeWidth = item?.w ?? 0;
        const nodeHeight = item?.h ?? 0;

        nodeWidth =
          Math.ceil(nodeWidth * (blockColumns / currentColumnNumber)) <
          (item?.minW ?? 2)
            ? item?.minW ?? 2
            : Math.ceil(nodeWidth * (blockColumns / currentColumnNumber));

        return {
          isActive: monitor.canDrop() && monitor.isOver({ shallow: true }),
          nodeWidth: nodeWidth,
          nodeHeight: nodeHeight,
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [bounds, bounds, UNIT_HEIGHT, canDrop, UNIT_HEIGHT, canDrop]
  );

  const unitWidth = useMemo(() => {
    return bounds.width / blockColumns;
  }, [blockColumns, bounds.width]);
  const maxY = useMemo(() => {
    return 0;
  }, []);

  const finalRowNumber = useMemo(() => {
    return maxY;
    //  Math.max(
    //   maxY,
    //   Math.floor((|| bounds.height) / UNIT_HEIGHT),
    // )
  }, [maxY]);
  useLayoutEffect(() => {
    if (!canDrop) {
      if (finalRowNumber === maxY && finalRowNumber + 40 >= rowNumber) {
        setRowNumber(finalRowNumber + 40);
      }
    } else {
      setRowNumber(maxY);
    }
  }, [maxY, canDrop, finalRowNumber, rowNumber]);
  const componentTree = useMemo(() => {
    return data1.map((item: ComponentNode) => (
      <ScaleSquare
        key={item.displayName}
        componentNode={item}
        unitH={UNIT_HEIGHT}
        unitW={unitWidth}
        containerHeight={400}
        containerPadding={10}
        childrenNode={[]}
        collisionEffect={new Map()}
        blockColumns={blockColumns}
      />
    ));
  }, [
    blockColumns,
    data1,
    // addedRowNumber,blockColumns,minHeight,
    unitWidth,
  ]);
  return (
    <div
      ref={(node) => {
        currentCanvasRef.current = node;
        dropTarget(node);
        canvasRef(node);
      }}
      role="TargetBox"
      css={applyComponentCanvasStyle(
        bounds.width,
        bounds.height,
        bounds.width / blockColumns,
        UNIT_HEIGHT,
        isActive,
        600
      )}
    >
      {componentTree}
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
  );
};

export default RenderComponentCanvas;
