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
      minTemp: item.min_temp.toString(),
      maxTemp: item.max_temp.toString(),
      theTemp: item.the_temp.toString(),
      windSpeed: item.wind_speed.toString(),
      airPressure: item.air_pressure.toString(),
      humidity: item.humidity.toString(),
      visibility: item.visibility.toString(),
      predictability: item.predictability.toString(),
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
