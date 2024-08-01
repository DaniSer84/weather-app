import styled from 'styled-components';
import HourForecast from './HourForecast';
import ScrollContainer from 'react-indiana-drag-scroll';
import { format } from 'date-fns';
import { weatherIconUrl } from '../../../shared/baseUrls';
import {weatherBackgroundColor} from '../../../shared/weatherBackgroundIcon';

const HourForecastWrapper = styled.div`
  color: white;
  cursor: pointer;
`
const ForecastContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  max-height: 300px;
`

function HourForecastContainer({forecast, timezone}) {
  let hourForecast = forecast.map(element => {
    let temp = Math.round(element.main.temp);
    let day = format(new Date((element.dt + timezone) * 1000), 'EE')
    let time = format(new Date((element.dt + timezone) * 1000), 'kk:mm')
    let weatherIcon = `${weatherIconUrl}${element.weather[0].icon}.png`;
    let cardColor = weatherBackgroundColor(element.weather[0].icon);

    return (
      <HourForecast 
      time={{day, time}}
      temperature={temp}
      cardColor={cardColor}
      weatherIcon={weatherIcon}
      description={element.weather[0].description}
      key={element.dt}
      />
    )
  })
  
  return(
    <ScrollContainer>
      <HourForecastWrapper>
        <ForecastContainer>
          {hourForecast}
        </ForecastContainer>
      </HourForecastWrapper>
    </ScrollContainer>
  )
}

export default HourForecastContainer;