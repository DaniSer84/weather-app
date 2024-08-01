import {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';
import TodayDetails from './today/TodayDetails';
// import {weatherBackgroundColor} from '../../shared/weatherBackgroundIcon';
import TodayTemperature from './today/TodayTemperature';
import {format} from 'date-fns';
import { weatherIconUrl } from '../../shared/baseUrls';

const Section = styled.section`
	flex-direction: column;
	display: flex;
	margin-top: 20px;
	@media (min-width: 996px) {
		flex-direction: row;
	}
`

const Article = styled.article`
	color: white;
	padding-top: 20px;
	background: #6b54c9;
	h1 {
		margin: 20px 0;
		text-align: center;
	}
	h2 {
		font-size: ${props => props.theme.title2};
		text-align: center;
	}
	h3 {
		font-size: ${props => props.theme.bigger};
		text-align: center;
	}
	@media (min-width: 996px) {
		box-shadow: ${props => props.theme.boxShadow};
		padding: 50px;
		width: 100%;
		margin: 0;
		h1, h2, h3 {
			text-align: left;
		}
	}
`
function SelectedCityDetails({city, currentWeather}) {
	let time = format(
		(new Date().getTime() + (city.timezone * 1000)),
		'EEEE d, MMMM | hh:mm a');
	let weatherIcon = `${weatherIconUrl}${currentWeather.weather[0].icon}@4x.png`;

	return (
		<Section>
			<TodayTemperature 
				icon={weatherIcon}
				description={currentWeather.weather[0].description}
				temperature={Math.round(currentWeather.main.temp)}
			/>
			<Article backgroundColor={currentWeather.weather[0].icon}>
				<h1 className='big-text'>{city.name}</h1>
				<h2>{time}</h2>
				<h3>{currentWeather.weather[0].main}</h3>
				<TodayDetails 
					wind={currentWeather.wind}
					temp={currentWeather.main.temp}
					feels_like={currentWeather.main.feels_like}
					humidity={currentWeather.main.humidity}
					visibility={currentWeather.visibility}
					pressure={currentWeather.main.pressure}
				/>
			</Article>
		</Section>
	) 
}

export default SelectedCityDetails;