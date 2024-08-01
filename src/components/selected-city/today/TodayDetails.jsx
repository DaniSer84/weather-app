import styled from 'styled-components';

let Container = styled.section`
  color: white;
  border-radius: 5px;
  background-color: rgba(255,255,255,0.1);
  box-shadow: 5px 10px 20px 0 rgba(0,0,0,0.17);
  padding: 30px 30px 18px 30px;
  margin: 20px 15px;

  @media (min-width: 576px) {
		margin: 20px auto;
    max-width: 400px;
	}

  @media (min-width: 996px) {
		margin: 20px 0 0 0;
	}
`

let SelectedCityTodayDetails = ({wind, temp, feels_like, humidity, visibility, pressure}) => {
  return(
    <Container>
        <p>The temperature is <strong>{temp}°C</strong> and it feels like <strong>{feels_like}°C</strong></p>
        <p>Wind: {wind.speed} m/s at {wind.deg}°.</p>
        <p>Humidity: {humidity}%<br/>
          Visibility: {visibility}m<br/>
          Pressure: {pressure}hPa
        </p>
    </Container>
  )
}

export default SelectedCityTodayDetails;