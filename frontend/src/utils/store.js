import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookingSlice from "./bookingSlice";


const appStore = configureStore({
    reducer: {
        user: userSlice,
        booking: bookingSlice
    }
})

export default appStore;