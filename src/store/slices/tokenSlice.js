import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../api";

const tokenSlice = createSlice({
    name: 'TOKEN',
    initialState: {
        user: null,
        interceptorId: null,
    },
    reducers: {
        setToken: (state, {payload: user}) => {
            const id = instance.interceptors.request.use(_req => {
                _req.headers.Authorization = `Bearer ${user.accessToken}`;
                return _req;
            })
            return {
                user,
                interceptorId: id,
            }
        },
        removeToken: ({interceptorId}, action) => {
            instance.interceptors.request.eject(interceptorId);
            return {
                user: null,
                interceptorId: null,
            }
        },
        updateUserInfo: (state, {payload}) => {
            return {
                user: {
                    ...state.user,
                    systemUser: payload,
                },
                interceptorId: state.interceptorId
            }
        }
    }
})

export const tokenDispatch = tokenSlice.actions;
export default tokenSlice.reducer;