import React, { useState } from "react";
import { WeatherForecastComponents } from "../StyledComponents/WeatherForecast";
import { useQuery } from "react-apollo";
import { Queries } from "../graphql/weather";

interface WeatherForecastProps {
  id: string;
}

const Details = (title: string, value: string) => (
  <WeatherForecastComponents.ColumnContainer>
    <WeatherForecastComponents.TodayDetailsText>
      {title}
    </WeatherForecastComponents.TodayDetailsText>
    <WeatherForecastComponents.TodayDetailsText>
      {value}
    </WeatherForecastComponents.TodayDetailsText>
  </WeatherForecastComponents.ColumnContainer>
);

const getDayTitle = (index: number) => {
  if (index === 0) {
    return "Today";
  } else if (index > 0) {
    return `+${index} Day`;
  }
};

const WeatherForecast = (props: WeatherForecastProps) => {
  const { loading, error, data } = useQuery(Queries.getWeather, {
    variables: { cityId: props.id }
  });

  const [shownIndex, setShownIndex] = useState(0);

  if (loading || error) {
    return null;
  }

  const forecasts = data.getWeather;
  if (forecasts.length === 0) {
    return null;
  }

  return (
    <WeatherForecastComponents.Container>
      <WeatherForecastComponents.TodayImage src={forecasts[shownIndex].icon} />
      <WeatherForecastComponents.TodayWeatherTitle>
        {forecasts[shownIndex].weatherState}
      </WeatherForecastComponents.TodayWeatherTitle>
      <WeatherForecastComponents.TodayWeatherTitle>
        {forecasts[shownIndex].theTemp}&deg;c
      </WeatherForecastComponents.TodayWeatherTitle>
      <WeatherForecastComponents.RowContainer>
        {Details("Lowest:", `${forecasts[shownIndex].minTemp}°c`)}
        {Details("Wind Speed:", `${forecasts[shownIndex].windSpeed}  m/h`)}
        {Details("Air Pressure:", `${forecasts[shownIndex].airPressure}  mbar`)}
        {Details("Visibility:", `${forecasts[shownIndex].visibility}  miles`)}
      </WeatherForecastComponents.RowContainer>
      <WeatherForecastComponents.RowContainer>
        {Details("Highest:", `${forecasts[shownIndex].maxTemp}°c`)}
        {Details("Wind Direction:", `${forecasts[shownIndex].windDirection}`)}
        {Details("Humidity:", `${forecasts[shownIndex].humidity}%`)}
        {Details("Predictability:", `${forecasts[shownIndex].predictability}%`)}
      </WeatherForecastComponents.RowContainer>
      <br />
      <WeatherForecastComponents.RowContainer>
        {forecasts.map((item: any, index: number) => {
          if (index === shownIndex) return null;
          return (
            <WeatherForecastComponents.OtherDayContainer
              key={index}
              onClick={() => setShownIndex(index)}
            >
              <div style={{ fontSize: "2vmin" }}>{getDayTitle(index)}</div>
              <WeatherForecastComponents.OtherImage src={item.icon} />
              <WeatherForecastComponents.OtherWeatherTitle>
                {item.weatherState}
              </WeatherForecastComponents.OtherWeatherTitle>
              <WeatherForecastComponents.OtherWeatherTitle>
                {item.theTemp}&deg;c
              </WeatherForecastComponents.OtherWeatherTitle>
            </WeatherForecastComponents.OtherDayContainer>
          );
        })}
      </WeatherForecastComponents.RowContainer>
    </WeatherForecastComponents.Container>
  );
};

export { WeatherForecast };
