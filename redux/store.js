import { configureStore } from "@reduxjs/toolkit"
import reactotron from "../ReactotronConfig"
import carSlice from "./reducers/car/carSlice"
import carDetailsSlice from './reducers/car/carDetailsSlice'
import userSlice from "./reducers/auth/loginSlice";

export const store = configureStore({
    reducer: {
        car: carSlice,
        carDetails: carDetailsSlice,
        user: userSlice
    },
    enhancers: 
        (getDefaultEnhancers) => 
            __DEV__ ? getDefaultEnhancers()
        .concat(reactotron.createEnhancer()) : getDefaultEnhancers()
})
