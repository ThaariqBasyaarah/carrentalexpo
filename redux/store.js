import { configureStore } from "@reduxjs/toolkit"
import reactotron from "../ReactotronConfig"
import carSlice from "./reducers/car/carSlice"
import carDetailsSlice from './reducers/car/carDetailsSlice'
// npm i @reduxjs/toolkit react-redux

export const store = configureStore({
    reducer: {
        car: carSlice,
        carDetails: carDetailsSlice
    },
    enhancers: 
        (getDefaultEnhancers) => 
            __DEV__ ? getDefaultEnhancers()
        .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
})

