import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
    toastMsg : {
        open : false,
        content : '',
        error : false
    }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        actSetToastMessage: (state, action) => {
            state.toastMsg = action.payload
        },
    },
})

export const counterAction = {
    fetchUserById: createAsyncThunk(
        'fetchUserById', async (params, thunkApi) => {
            const response = await api.get(params, 'products')
            if (response.data) {
                thunkApi.dispatch(settingsDispatch.changeObject(response.data))
                return true
            }
            return false
        }
    ),
    postProduct: createAsyncThunk(
        'postProduct', async (params, thunkApi) => {
            const response = await api.post(params, 'products')
            if (response.data) {
                thunkApi.dispatch(settingsDispatch.postObject(response.data))
                return true
            }
            return false
        }
    ),

}

// Action creators are generated for each case reducer function
export const settingsDispatch = settingsSlice.actions
export default settingsSlice.reducer