import styled, { keyframes } from "styled-components";

const fade_in = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`;

const Container = styled.div`
  width: 80%;
  max-width: 1024px;
  max-height: 800px;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  animation: ${fade_in} 1s linear forwards;

  @media (max-width: 750px) {
    margin-top: 15vh;
  }
`;

const TodayImage = styled.img`
  width: 15vmin;
`;

const TodayWeatherTitle = styled.div`
  color: white;
  font-size: 2vmin;
  text-align: center;
  margin-top: 1.5vmin;
`;

const TodayDetailsText = styled.div`
  color: white;
  font-size: 2vmin;
  text-align: center;
`;

const OtherImage = styled.img`
  width: 8vmin;
  max-height: 100px;
`;

const OtherWeatherTitle = styled.div`
  color: white;
  font-size: 2vmin;
  text-align: center;
  margin-top: 1.5vmin;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-contents: space-between;
  width: 100%;
  max-width: 1024px;
  max-height: 900px;
  padding-top: 1.5vmin;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: center;
  padding-left: 1.5vmin;
  padding-right: 1.5vmin;
  color: white;
  text-align: center;
`;

const OtherDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 19%;
  align-items: center;
  color: white;
  text-align: center;
  border-color: #0256ab;
  border-style: solid;
  border-width: 0.1vmin;
  background-color: #0659ac55;
  cursor: pointer;

  :hover {
    background-color: #0659ac99;
  }
`;

const WeatherForecastComponents = {
  Container,
  TodayImage,
  TodayWeatherTitle,
  RowContainer,
  ColumnContainer,
  OtherImage,
  OtherWeatherTitle,
  OtherDayContainer,
  TodayDetailsText,
};

export { WeatherForecastComponents };
