import { gql } from "apollo-server-express";

export const Types = gql`
  type Query {
    getWeather(cityId: String): [Weather]
    getNameCompletion(input: String): [City]
  }

  type Weather {
    id: String
    weatherState: String
    weatherStateAbbr: String
    humidity: String
    windDirection: String
    windSpeed: String
    minTemp: String
    maxTemp: String
    theTemp: String
    airPressure: String
    visibility: String
    predictability: String
    icon: String
  }

  type City {
    title: String
    id: String
  }
`;
