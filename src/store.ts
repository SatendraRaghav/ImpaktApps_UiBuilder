import componentsReducer from "@/redux/currentApp/editor/components/componentsSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        components:componentsReducer
    //   config: configReducer,
    //   currentApp: appReducer,
    //   dashboard: dashboardReducer,
    //   currentUser: currentUserReducer,
    //   liveFamily: liveFamilyReducer,
    //   builderInfo: builderInfoReducer,
    //   resource: resourceReducer,
    //   team: teamReducer,
    },
  })
  export default store
export type RootState = ReturnType<typeof store.getState>