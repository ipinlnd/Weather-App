import { Weather } from "../Types/Weather";
import { City } from "../Types/City";
import { WeatherService } from "../Services/WeatherService";

const getWeather = async (
  rootValue: any,
  args: { cityId: string },
): Promise<Weather[]> => {
  return await WeatherService.getWeather(args.cityId);
};

const getNameCompletion = async (
  rootValue: any,
  args: { input: string },
): Promise<City[]> => {
  return await WeatherService.getCity(args.input);
};

const Query = { getWeather, getNameCompletion };

const Resolvers = { Query };

export { Resolvers };
