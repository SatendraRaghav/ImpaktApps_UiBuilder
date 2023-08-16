import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ComponentNode, ComponentsState } from "./componentsState"

export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode[]|ComponentNode>
> = (state:any, action:any) => {
  state.childrenNode[0].childrenNode[0].childrenNode[0].childrenNode = action.payload;
  // [... state.childrenNode[0].childrenNode[0].childrenNode[0].childrenNode,action.payload]
    // return {...state,}
   
}


// export const updateComponentReducer: CaseReducer<
//   ComponentsState,
//   PayloadAction<ComponentNode[]|ComponentNode>
// > = (state:any, action:any) => {
//  const allChildrens =  state.childrenNode[0].childrenNode[0].childrenNode[0].childrenNode = 

   
// }