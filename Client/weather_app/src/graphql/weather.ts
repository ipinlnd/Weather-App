import gql from "graphql-tag";

const getWeather = gql`
  query getWeather($cityId: String) {
    getWeather(cityId: $cityId) {
      id
      weatherState
      weatherStateAbbr
      humidity
      windDirection
      windSpeed
      minTemp
      maxTemp
      theTemp
      airPressure
      visibility
      predictability
      icon
    }
  }
`;

const getNameCompletion = gql`
  query getNameCompletion($input: String) {
    getNameCompletion(input: $input) {
      id
      title
    }
  }
`;

const Queries = { getNameCompletion, getWeather };

export { Queries };
