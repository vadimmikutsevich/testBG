import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newsSlice from "./reducers/NewsSlice";

const rootReducer = combineReducers({
    newsSlice,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type Store = ReturnType<typeof setupStore>
export type Dispatch = Store['dispatch']