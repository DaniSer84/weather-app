import styled from 'styled-components';
import DayForecast from './DayForecast.jsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import { format } from 'date-fns';
import { weatherIconUrl } from '../../../shared/baseUrls.js';
import {weatherBackgroundColor} from '../../../shared/weatherBackgroundIcon.js';

const ForecastContainer = styled.div`
  cursor: pointer;
  display: flex;
  margin: 20px 0 0 20px;
`

function WeekForecast({forecast, timezone}) {
  let day = format(new Date(), 'EEEE');
  let count;
  
  // Per ottenere le previsioni dei giorni della settimana, filtro l'array in modo da recuperare solo un dato per ogni giorno
  let weekForecast = forecast
    .filter(el => {
      let forecastDay = format(new Date((el.dt + timezone) * 1000), 'EEEE');
      let newDay = (forecastDay !== day) ? forecastDay : '';
      if(newDay) {
        count = 0;
        day = newDay;
      } else {
        count++;
      }
      // mostro la previsione delle ore 14.00 (per ogni giorno abbiamo una previsione ogni 3 ore)
      if(count === 4) {
        return true;
      }
      return false
    })
    .map(element => {
      let temp = Math.round(element.main.temp);
      let weatherIcon = `${weatherIconUrl}${element.weather[0].icon}@2x.png`;
      let day = format(new Date(element.dt * 1000), 'EEEE');
      let cardColor = weatherBackgroundColor(element.weather[0].icon);

      return (
        <DayForecast 
          day={day}
          temperature={temp}
          cardColor={cardColor}
          weatherIcon={weatherIcon}
          description={element.weather[0].description}
          key={day}
        />
      )
    })

  return(
    <ScrollContainer>
      <ForecastContainer>
        {weekForecast}
      </ForecastContainer>
    </ScrollContainer>
  )
}

export default WeekForecast;