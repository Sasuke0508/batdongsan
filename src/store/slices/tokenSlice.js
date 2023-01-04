import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'TOKEN',
    initialState: {
        user: JSON.parse(localStorage.getItem('token') ?? 'null'),
    },
    reducers: {
        setToken: (state, {payload: user}) => {
            localStorage.setItem('token', JSON.stringify(user));
            sessionStorage.setItem('token', user.accessToken);
            return {
                user,
            }
        },
        removeToken: ({interceptorId}, action) => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            return {
                user: null
            };
        },
        updateUserInfo: (state, {payload}) => {
            const newUser = {
                ...state.user,
                systemUser: payload,
            };
            localStorage.setItem('token', JSON.stringify(newUser));
            return {
                user: newUser
            }
        }
    }
})

export const tokenDispatch = tokenSlice.actions;
export default tokenSlice.reducer;