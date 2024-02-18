import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { weatherInterpretationRu } from "../../utils/WeatherCode";

const WeatherCard = ({ city }: { city: string }) => {
  interface WeatherData {
    temperature: number;
    weathercode: number;
    windspeed: number;
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const locationResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const { latitude, longitude } = locationResponse.data.results[0];
        setLatitude(latitude);
        setLongitude(longitude);

        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&windspeed_unit=ms`
        );
        setWeatherData(response.data.current_weather);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <Card style={{ marginBottom: "20px" }}>
      <Card.Body>
        <Card.Title>{city}</Card.Title>
        {weatherData ? (
          <div>
            <p>Температура: {weatherData.temperature} °C</p>
            <p>Погода: {weatherInterpretationRu[weatherData.weathercode]}</p>
            <p>Скорость ветра: {weatherData.windspeed} m/s</p>
            <Link to={`/weather/${city}?lat=${latitude}&lng=${longitude}`}>
              <Button>Подробный прогноз</Button>
            </Link>
          </div>
        ) : (
          <Spinner />
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
