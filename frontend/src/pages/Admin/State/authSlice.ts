import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    isLoggedIn: boolean,
}

const initialState: AuthState = {
    isLoggedIn: false
}


const authSlcie = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state: AuthState) => {
            state.isLoggedIn = true
        },
        logout: (state: AuthState) => {
            state.isLoggedIn = false
        }
    }
})

export const { login, logout } = authSlcie.actions
export default authSlcie.reducer;