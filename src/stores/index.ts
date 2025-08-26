import {configureStore} from "@reduxjs/toolkit";
import {userAPI} from "./service/user.ts";


export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
            // apiLogger,
            userAPI.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
