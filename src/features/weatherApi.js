import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addedCity } from "./citiesSlice";

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://api.openweathermap.org'}),
    // refetchOnMountOrArgChange: 5,
    endpoints: (builder) => ({
        getCoordinatesByCityName: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const coordsResult = await fetchWithBQ(`geo/1.0/direct?q=${_arg.name}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API}`)
                if(coordsResult.error) return {error: coordsResult.error}
                const city = {
                    id: _arg.id,
                    name: coordsResult.data[0].name,
                    coords: {
                        lat: coordsResult.data[0].lat,
                        lon: coordsResult.data[0].lon
                    }
                }
                _queryApi.dispatch(addedCity(city))
                return coordsResult.data ? city : {error: coordsResult.error}
            }
        }),
        getCityByCoords: builder.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
                const cityResult = await fetchWithBQ(`data/2.5/weather?lat=${_arg.lat}&lon=${_arg.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`)
                if(cityResult.error) return {error: cityResult.error}
                const city = {
                    id: _arg.id,
                    name: cityResult.data.name,
                    coords: {
                        lat: _arg.lat,
                        lon: _arg.lon
                    }
                }
                _queryApi.dispatch(addedCity(city))
                return cityResult.data ? city : {error: cityResult.error}
            }
        }),
        getWeatherByCoords: builder.query({
            query: (coords) => `data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`
        }),
        getForecastByCoords: builder.query({
            query: (coords) => `data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API}&units=metric`
        }),
    })
})

export const { useGetWeatherByCoordsQuery, useGetForecastByCoordsQuery, useGetCoordinatesByCityNameQuery } = weatherApi