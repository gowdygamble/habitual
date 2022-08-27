import { configureStore } from "@reduxjs/toolkit";

import todayReducer from './features/today/todaySlice';

export const store = configureStore({
    reducer: {
        today: todayReducer,
    },
});