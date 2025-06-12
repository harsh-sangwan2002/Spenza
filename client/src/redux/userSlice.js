import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

let initialUser = localStorage.getItem('user');

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        token: initialToken,
        user: initialUser,
        isAuthenticated: !!initialUser,
        loading: true,
    },
    reducers: {
        login: (state, action) => {
            console.log('Login action payload:', action.payload);
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.id));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { login, logout, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;
