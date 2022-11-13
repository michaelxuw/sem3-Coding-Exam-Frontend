import React from "react";
import WeatherNCat from "../types/entities/weatherNCat";

interface WeatherInfoBoxProps {
	weather: WeatherNCat["weather"];
}

function WeatherInfoBox({ weather }: WeatherInfoBoxProps) {
	return (
		<div>
			<h2 className="text-2xl font-extrabold">Current weather in {weather.LocationName}</h2>
			<div>
				<p>Humidity: {weather.CurrentData?.humidity}</p>
				<p>Sky: {weather.CurrentData?.skyText}</p>
				<p>Temperature: {weather.CurrentData?.temperature}</p>
				<p>Wind: {weather.CurrentData?.windText}</p>
			</div>
		</div>
	);
}

export default WeatherInfoBox;
