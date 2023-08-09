import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const getCanvas = (state:RootState)=>state.components;
export const getSectionChildren = createSelector(
    [getCanvas],
    (rootDsl) => {

   return rootDsl.childrenNode[0].childrenNode[0].childrenNode[0].childrenNode
    })