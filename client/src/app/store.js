// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import teamsApiSlice from '../slices/teamsApiSlice';
import programsApiSlice from '../slices/programsApiSlice';
import participantsApiSlice from '../slices/participantsApiSlice';

export const store = configureStore({
    reducer: {
        [teamsApiSlice.reducerPath]: teamsApiSlice.reducer,
        [programsApiSlice.reducerPath]: programsApiSlice.reducer,
        [participantsApiSlice.reducerPath]: participantsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(teamsApiSlice.middleware)
            .concat(programsApiSlice.middleware)
            .concat(participantsApiSlice.middleware),
    devTools: true,
});
