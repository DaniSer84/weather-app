import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.theme[props.cardColor]};
  border-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  color: white;
  flex: 0 0 15%;
  margin: 20px 8px;
  padding: 20px 25px;
  text-align: center;
`
const Day = styled.div`
  font-size:  ${props => props.theme.bigger};
  font-weight: bold;
`
const Temperature = styled.div`
  font-size:  ${props => props.theme.title1};
  font-weight: bold;
`

function DayForecast({day, temperature, cardColor, weatherIcon, description}) {
  
  return(
    <Card cardColor={cardColor}>
      <Day>{day}</Day>
      <Temperature>{temperature}°</Temperature>
      <img src={weatherIcon} alt={description}/>
    </Card>
  )
}

export default DayForecast;