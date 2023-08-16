import { memo } from "react";
import { ScaleSquareProps } from "./interface";
import { Rnd } from "react-rnd";
import { widgetBuilder } from "@/widgetLibrary/widgetBuilder";
import {
  DragCollectedInfo,
  DragInfo,
  DropResultInfo,
} from "../dotPanel/interface";
import { useDrag } from "react-dnd";
import { applyDashedLineStyle, dragPreviewStyle } from "./style";

export const ScaleSquare = memo<ScaleSquareProps>((props: ScaleSquareProps) => {
  const {
    componentNode,
    unitW,
    unitH,
    // containerPadding,
    // containerHeight,
    // childrenNode,
    // collisionEffect,
    blockColumns,
  } = props;
  const obj = widgetBuilder(componentNode.type);
  const Component = obj.widget;
  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag<
    DragInfo,
    DropResultInfo,
    DragCollectedInfo
  >(
    () => ({
      type: "components",
      canDrag: () => {
        return true;
      },
      item: () => {
        return {
          item: componentNode,
          childrenNodes: [],
          currentColumnNumber: blockColumns,
        };
      },
      collect: (monitor: any) => {
        return {
          isDragging: monitor.isDragging(),
        };
      },
    }),
    [componentNode, blockColumns]
  );
  return (
    <Rnd
      bounds="parent"
      // style={{ display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      // background: "#f0f0f0"}}
      position={{
        x: componentNode.x*unitW ,
        y: componentNode.y*unitH,
      }}
      size={{
        width: componentNode.w*unitW,
        height: componentNode.h*unitH,
      }}
      // default={{
      //   x: componentNode.x,
      //   y: componentNode.y,
      //   // x: lunchXY[0],
      //   // y: lunchXY[1],
      //   // width: 200,
      //   // height: 50
      //   width: componentNode.w*componentNode.unitW,
      //   height: componentNode.h*componentNode.unitH
      // }}
    >
      <div 
      ref={dragRef}
      >
        <Component />
      </div>
      <div
              css={applyDashedLineStyle(
                true,
                true,
                isDragging,
              )} />
      <div css={dragPreviewStyle} ref={dragPreviewRef} />
    </Rnd>
  );
});

//   {/* <Resizable style={{border:"1px solid gray"}} defaultSize={{width:200,height:50}}> */}
//   {/* <div > */}
// {/* <Component /> */}
// {/* </div> */}
// {/* </Resizable> */}
