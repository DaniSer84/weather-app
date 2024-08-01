import styled from "styled-components"
import Button from "../ui/Button"
import InputForm from "../ui/InputForm"
import CityListItem from "./CityListItem"
import { useEffect, useState } from "react"
import cities from "../../mock/cities"
import { nanoid } from "nanoid"
import { weatherApi } from "../../features/weatherApi"
import { useDispatch, useSelector } from "react-redux"
import { removedCity } from "../../features/citiesSlice"
import { setTextFilter } from '../../features/filtersSlice'

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: ${props => props.theme.s1};
`
const EmptyState = styled.div`
    text-align: center;
    padding-top: ${props => props.theme.s1};
`

export default function CityList() {
    let dispatch = useDispatch()
    const [isInputVisible, setIsInputVisible] = useState(false)
    // questo valore arriverà da redux
    let filters = useSelector(state => state.filters)
    let cityList = useSelector(state => state.cities)

    useEffect(() => {
        localStorage.setItem('cityList', JSON.stringify(cityList))
    }, [cityList])
    
    let filteredCityList = cityList.filter(city => {
        const textMatch = city.name.toLowerCase().includes(filters.toLowerCase())
        return textMatch
    })

     function handleAddCity(city) {
        let cityId = nanoid()
        dispatch(weatherApi.endpoints.getCoordinatesByCityName.initiate({
            id: cityId,
            name: city,
        }))
    }
    
    function handleAddPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position)
                let cityId = nanoid()
                dispatch(weatherApi.endpoints.getCityByCoords.initiate({
                    id: cityId,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }))
            });
        } else {
            // non è carino un alert, sarebbe meglio creare un'avviso all'interno dell'app
            // alert('your browser does not support geolocation')
        }
        
    }
    
    function handleFilterCities(text) {
        dispatch(setTextFilter(text))
    }
    function handleClearInput() {
        dispatch(setTextFilter(''))
    }
    
    function handleDeleteCity(id) {
        dispatch(removedCity(id))
    }
    
    return (
        <>
            <ButtonContainer>
                 <Button handleClick={() => setIsInputVisible(!isInputVisible)}>
                    Add City
                 </Button>
                 <Button handleClick={handleAddPosition}>
                    Add Position
                 </Button>
            </ButtonContainer>
            {isInputVisible && (
                <InputForm 
                buttonText={'Add City'}
                placeholder={'Insert city name'}
                buttonAction={handleAddCity}

            />
            )}
            <InputForm 
                buttonText={'Clear filter'}
                placeholder={'filter city list'}
                buttonAction={handleClearInput}

                inputValue={filters}
                inputAction={handleFilterCities}
            />
            {
                filteredCityList && filteredCityList.length > 0 ? filteredCityList.map(city => {
                    return <CityListItem city={city} key={city.id} deleteCity={handleDeleteCity}/>
                }) : (
                    <EmptyState>Add a new City or remove filters</EmptyState>
                )
            }
        </>
    )
}