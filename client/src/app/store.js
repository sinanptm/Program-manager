import { configureStore } from '@reduxjs/toolkit';
import { participantsApiSlice } from '../slices/participantsApiSlice';
import { programsApiSlice } from '../slices/programsApiSlice';
import { teamsApiSlice } from '../slices/teamsApiSlice';
import adminSlice from '../slices/adminSlice'; // Ensure this path is correct

export const store = configureStore({
    reducer: {
        admin: adminSlice,
        [participantsApiSlice.reducerPath]: participantsApiSlice.reducer,
        [programsApiSlice.reducerPath]: programsApiSlice.reducer,
        [teamsApiSlice.reducerPath]: teamsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            participantsApiSlice.middleware,
            programsApiSlice.middleware,
            teamsApiSlice.middleware
        ),
});
