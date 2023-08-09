import { createSlice } from "@reduxjs/toolkit"
import {
  addComponentReducer,
  
} from "@/redux/currentApp/editor/components/componentsReducer"
import { ComponentsInitialState } from "@/redux/currentApp/editor/components/componentsState"

const componentsSlice = createSlice({
  name: "components",
  initialState: ComponentsInitialState,
  reducers: {
    // updateComponentLayoutInfoReducer,
    addComponentReducer
  },
})

export const componentsActions = componentsSlice.actions
export default componentsSlice.reducer
