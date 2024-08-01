import styled from "styled-components"
import { Link } from "react-router-dom"

import SelectedCityDetails from "./SelectedCityDetails"
import HourForecastContainer from "./hour/HourForecastContainer"
import WeekForecastContainer from "./week/WeekForecastContainer"
import Button from '../ui/Button'

import forecast from '../../mock/forecast'
import { useGetForecastByCoordsQuery } from "../../features/weatherApi"

const StyledSelectedCity = styled.div`
 margin: 10px;
`
const SelectedCityContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
`

export default function SelectedCity({coords}) {
    const {data, error, isLoading } = useGetForecastByCoordsQuery(coords)

    let content = <h3>Forecast not found</h3>

    if(isLoading) {
        content = <h3>Loading ...</h3> 
      }
    if(error) {
    content = <p>Error!</p>
    }
    
    if(data) {
        content = (
            <>
                <SelectedCityDetails
                    city={data.city}
                    currentWeather={data.list[0]}
                />
                <WeekForecastContainer 
                    forecast={data.list}
                    timezone={data.city.timezone}    
                />
                <HourForecastContainer 
                    forecast={data.list}
                    timezone={data.city.timezone}    
                />
            </>
        )
    }

    return (
        <>
            <StyledSelectedCity>
                <Link to='/'>
                    <Button>
                        Back
                    </Button>
                </Link>
                <SelectedCityContainer>
                    {content}
                </SelectedCityContainer>
            </StyledSelectedCity>
        </>
    )
}