interface WeatherNCat {
  weather: {
    LocationName: string;
    CurrentData: {
      temperature: number;
      skyText: string;
      humidity: number;
      windText: string;
    };
  },
  cat: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
}

export default WeatherNCat;