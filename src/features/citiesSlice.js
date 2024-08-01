import { createSlice } from "@reduxjs/toolkit";

let savedCityList = localStorage.getItem('cityList')
let initialCities = JSON.parse(savedCityList)
const initialState = initialCities || []

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        addedCity: (state, action) => {
            state.push(action.payload)
        },
        removedCity: (state, action) => {
            return state.filter(city => city.id !== action.payload)
        },
    },
})

export const { addedCity, removedCity } = citiesSlice.actions

export default citiesSlice.reducer