import { configureStore } from "@reduxjs/toolkit"
import reactotron from "../ReactotronConfig"
import carSlice from "./reducers/car/carSlice"
import carDetailsSlice from './reducers/car/carDetailsSlice'
import loginSlice from './reducers/auth/loginSlice'
// npm i @reduxjs/toolkit react-redux

export const store = configureStore({
    reducer: {
        car: carSlice,
        carDetails: carDetailsSlice,
        user: loginSlice
    },
    enhancers: 
        (getDefaultEnhancers) => 
            __DEV__ ? getDefaultEnhancers()
        .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
})

