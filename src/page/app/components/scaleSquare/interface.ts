import { HTMLAttributes } from "react"
import { ComponentNode } from "../dotPanel/componentinterface"

export interface ScaleSquareProps extends HTMLAttributes<HTMLDivElement> {
    componentNode: ComponentNode
    unitW: number
    unitH: number
    containerHeight: number
    containerPadding: number
    childrenNode: ComponentNode[]
    collisionEffect: Map<string, ComponentNode>
    blockColumns: number
  }