import { configureStore } from '@reduxjs/toolkit';
import { participantsApiSlice } from '../slices/participantsApiSlice';
import { programsApiSlice } from '../slices/programsApiSlice';
import { teamsApiSlice } from '../slices/teamsApiSlice';
import { authApiSlice } from '../slices/authApiSlice'
import authSlice from '../slices/authSlice'; // Ensure this path is correct

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [participantsApiSlice.reducerPath]: participantsApiSlice.reducer,
        [programsApiSlice.reducerPath]: programsApiSlice.reducer,
        [teamsApiSlice.reducerPath]: teamsApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            participantsApiSlice.middleware,
            programsApiSlice.middleware,
            teamsApiSlice.middleware,
            authApiSlice.middleware
        ),
});
