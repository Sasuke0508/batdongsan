import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
    value: 0,
    test: []
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        changeObject: (state, action) => {
            state.test = action.payload
        },
        postObject: (state, action) => {
            state.post = action.payload
        }
    },
})

export const counterAction = {
    fetchUserById: createAsyncThunk(
        'fetchUserById', async (params, thunkApi) => {
            const response = await api.get(params, 'products')
            if (response.data) {
                thunkApi.dispatch(counterDispatch.changeObject(response.data))
                return true
            }
            return false
        }
    ),
    postProduct: createAsyncThunk(
        'postProduct', async (params, thunkApi) => {
            const response = await api.post(params, 'products')
            if (response.data) {
                thunkApi.dispatch(counterDispatch.postObject(response.data))
                return true
            }
            return false
        }
    ),

}

// Action creators are generated for each case reducer function
export const counterDispatch = counterSlice.actions
export default counterSlice.reducer