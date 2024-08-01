import styled from 'styled-components';

const Panel = styled.div`
  order: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  span {
    color: white;
  } 
  
  @media (min-width: 996px) {
    order: 0;
    display: flex;
    flex-direction: column;
    padding: 25px;
    background: ${props => props.theme.purpleGradient};
  }
`
let Image = styled.img`
  max-width: 100px;
  @media (min-width: 390px) {
    max-width: none;
  }
  @media (min-width: 996px) {
    order: 2;
    max-width: 100px;
  }
`
let Text = styled.span`
  font-size: ${props => props.theme.huge};
  font-weight: 700;
  @media (min-width: 996px) {
    font-size: ${props => props.theme.important};
  }
`

function SelectedCityTemperature({icon, description, temperature}){

  return(
    <Panel>
      <Image src={icon} alt={description} />
      <Text>{temperature}°</Text>
    </Panel>
  )
}

export default SelectedCityTemperature;