import { css } from "@emotion/react";

export const dragPreviewStyle = css`
  position: absolute;
  background: transparent;
  top: 0;
  left: 0;
  height: 1px;
  width: 1px;
`
export const applyDashedLineStyle = (
    isSelected: boolean,
    isShowCanvasDot: boolean,
    isDragging: boolean,
    maxHeight?: number,
  ) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    max-height: ${maxHeight ? `${maxHeight}px` : "unset"};
    pointer-events: none;
    border: 1px solid gray
  `