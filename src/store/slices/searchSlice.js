import { createSlice } from "@reduxjs/toolkit";
import { sellTypes, sortOptions } from "../../constants";

export const defaultValueSearch = {
    houseType: sellTypes[0].value,
    searchText: "",
    address: {
        city: "",
        district: "",
        ward: "",
        number: "",
    },
    price: {
        from: 0,
        to: 0,
    },
    status: 'ACTIVE',
    filterMore: {
        utility: [],
        bedroom: [],
        media: [],
    },
    areaSize: {
        from: 0,
        to: 0,
    },
    paging: {
        page: 1,
        limit: 16,
        sort: sortOptions[0].value
    }
};

const searchSlice = createSlice({
    name: 'SEARCH_POST',
    initialState: defaultValueSearch,
    reducers: {
        updateData: (state, {payload}) => {
            return {
                ...state,
                ...payload
            }
        },
        resetData: (state, action) => {
            return defaultValueSearch;
        },
        goToPage: (state, {payload}) => {
            return {
                ...state,
                paging: {
                    ...state.paging,
                    ...payload
                }
            }
        },
        resetSort: (state, {payload}) => {
            return {
                ...state,
                paging: {
                    ...state.paging,
                    sort: sortOptions[0].value
                }
            }
        },
        updateSort: (state, {payload}) => {
            return {
                ...state,
                paging: {
                    ...state.paging,
                    sort: payload
                }
            }
        }
    }
});

export const searchDispatch = searchSlice.actions;
export default searchSlice.reducer;