import { configureStore } from '@reduxjs/toolkit'
import citiesSlice from '../features/citiesSlice'
import filtersSlice from '../features/filtersSlice'
import {weatherApi} from '../features/weatherApi'
export const store = configureStore({
  reducer: {
    cities: citiesSlice,
    filters: filtersSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
})
