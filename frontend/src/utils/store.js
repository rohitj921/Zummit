import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookingSlice from "./bookingSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'store',
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    booking: bookingSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const appStore = configureStore({
    reducer: persistedReducer
})
export const persistedStore = persistStore(appStore)
