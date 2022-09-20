import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    authenticated: false,
    username: null
}

export const authSlice = createSlice({
    name: 'auth-status',
    initialState: authInitialState,
    reducers: {
        signIn(state, action) {
            state.authenticated = true;
            state.username = action.payload.username;
        },
        signOut(state, action) {
            state.authenticated = false;
            state.username = null;
        }
    }
})

export const authActions = authSlice.actions;