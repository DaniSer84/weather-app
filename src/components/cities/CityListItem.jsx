import { useState,useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import {Link} from 'react-router-dom';
import {weatherBackgroundColor} from '../../shared/weatherBackgroundIcon';
import { format } from 'date-fns';
import { useGetWeatherByCoordsQuery } from '../../features/weatherApi';
import weather from './../../mock/weather';

const Container = styled.div`
	position: relative;
  max-width: 800px;
  margin: 0 auto;
`
const Button = styled.button`
  background-color: ${props => props.theme.red};
  border: none;
  color: white;
  cursor: pointer;
  font-size: ${props => props.theme.s2};
  position: absolute;
  height: 40px;
  width: 40px;
  right: 20px;
  top: 0;
  &:hover {
    background-color: ${props => props.theme.darkRed};
  }
`
const Article = styled.article`
	align-items: center;
	background: ${props => props.theme[props.cardColor]};
	color: white;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 20px;	
	padding: 25px;
`
const Details = styled.div`
	flex-basis: 33.333%;
	flex-shrink: 1;
	flex-grow: 1;
`
const Weather = styled.div`
	flex-basis: 33.333%;
	flex-shrink: 1;
	flex-grow: 1;
	text-align: center;
`
const Temperature = styled.div`
	flex-basis: 33.333%;
	flex-shrink: 1;
	flex-grow: 1;
	text-align: right;
`


export default function CityListItem({
  city,
  deleteCity
}) {
    // let data = weather
    let {data, error, isLoading} = useGetWeatherByCoordsQuery(city.coords)
    
    let content = <h3>No cities found</h3>
    if(isLoading) {
      content = <h3>Loading ...</h3> 
    }
    if(error) {
      content = <p>Error!</p>
    }
    

    if(data) {
      let cardColor = weatherBackgroundColor(data.weather[0].icon);
      content = (
        <Container>
          <Button onClick={() => deleteCity(city.id)}>X</Button>
          <Link to={`/city?lat=${city.coords.lat}&lon=${city.coords.lon}`}>
            <Article className="city-box" cardColor={cardColor}>
              <Details>
                <h2>{data.name}</h2>
                <p>{format(new Date((data.dt + data.timezone) * 1000), 'EEEE d, MMMM')}</p>
                <p className="small-text">{format(new Date((data.dt + data.timezone) * 1000), 'p')}</p>
              </Details>
              <Weather>
                {/* <img src={`${details.iconUrl}@2x.png`} alt={details.weather}/> */}
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
              </Weather>
              <Temperature className="big-text">
                {Math.round(data.main.temp)}°
              </Temperature>
            </Article>
          </Link>
        </Container>
      )
    }
  

  return(
    <>
      {content}
    </>
  )
}