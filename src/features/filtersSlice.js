import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: '',
    reducers: {
        setTextFilter: (state, action) => {
            return action.payload
        }
    }
})

const {actions, reducer} = filtersSlice
export const {setTextFilter} = actions
export default reducer