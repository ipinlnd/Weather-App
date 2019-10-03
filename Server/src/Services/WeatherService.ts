import { Weather } from "../Types/Weather";
import fetch from "node-fetch";
import { City } from "../Types/City";

const SERVER_STRING = "https://www.metaweather.com";

const getWeather = async (cityID: string): Promise<Weather[]> => {
  let weathers: Weather[] = [];
  const queryString = SERVER_STRING + `/api/location/${cityID}`;

  const data = await fetch(queryString);

  if (!data.ok) {
    return weathers;
  }

  const json = await data.json();
  var consolidatedWeather = json.consolidated_weather;
  consolidatedWeather.map((item: any, index: number) => {
    weathers.push({
      id: item.id.toString(),
      weatherState: item.weather_state_name,
      weatherStateAbbr: item.weather_state_abbr,
      windDirection: item.wind_direction_compass,
      minTemp: item.min_temp ? item.min_temp.toFixed(2) : "N/A",
      maxTemp: item.max_temp ? item.max_temp.toFixed(2) : "N/A",
      theTemp: item.the_temp ? item.the_temp.toFixed(2) : "N/A",
      windSpeed: item.wind_speed ? item.wind_speed.toFixed(2) : "N/A",
      airPressure: item.air_pressure ? item.air_pressure.toFixed(2) : "N/A",
      humidity: item.humidity ? item.humidity.toFixed(2) : "N/A",
      visibility: item.visibility ? item.visibility.toFixed(2) : "N/A",
      predictability: item.predictability
        ? item.predictability.toFixed(2)
        : "N/A",
      icon:
        SERVER_STRING + `/static/img/weather/${item.weather_state_abbr}.svg`,
    });
  });

  return weathers;
};

const getCity = async (input: string): Promise<City[]> => {
  let cities: City[] = [];
  const queryString = SERVER_STRING + `/api/location/search/?query=${input}`;

  const data = await fetch(queryString);

  if (!data.ok) {
    return cities;
  }

  const json = await data.json();
  json.map((item: any, index: number) => {
    cities.push({
      id: item.woeid,
      title: item.title,
    });
  });

  return cities;
};

const WeatherService = { getWeather, getCity };

export { WeatherService };
