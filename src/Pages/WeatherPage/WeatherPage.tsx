import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { weatherInterpretationRu } from "../../utils/WeatherCode";

interface LocationResponse {
  results: [{ latitude: number; longitude: number }];
}

interface ForecastResponse {
  daily: {
    time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  };
  
}

interface MatchParams {
  city: string;
  [key: string]: string;
}

const WeatherPage: React.FC = () => {
  const { city } = useParams<MatchParams>();
  const [timeData, setTimeData] = useState<string[]>([]);
  const [maxTempData, setMaxTempData] = useState<number[]>([]);
  const [minTempData, setMinTempData] = useState<number[]>([]);
  const [weatherCodeData, setWeatherCodeData] = useState<number[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    return `${day}/${month}`;
  };

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setIsActive(false);
        const locationResponse = await axios.get<LocationResponse>(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );
        const { latitude, longitude } = locationResponse.data.results[0];

        const forecastResponse = await axios.get<ForecastResponse>(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`
        );

        const {time, temperature_2m_max, temperature_2m_min, weathercode} = forecastResponse.data.daily;

        setTimeData(time);
        setMaxTempData(temperature_2m_max);
        setMinTempData(temperature_2m_min);
        setWeatherCodeData(weathercode);
        setIsActive(true);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    if (city) fetchForecastData();
  }, [city]);

  return (
    <Container>
      <Row>
        {isActive ? (
          <Col>
            <Link to="/">Назад</Link>
            <h1>{city}</h1>

            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Дата</th>
                  {timeData.map((time, index) => (
                    <td key={index}>{formatDate(time)}</td>
                  ))}
                </tr>
                <tr>
                  <th>Максимальная температура</th>
                  {maxTempData.map((maxTemp, index) => (
                    <td key={index}>{maxTemp}°C</td>
                  ))}
                </tr>
                <tr>
                  <th>Минимальная температура</th>
                  {minTempData.map((minTemp, index) => (
                    <td key={index}>{minTemp}°C</td>
                  ))}
                </tr>
                <tr>
                  <th>Погода</th>
                  {weatherCodeData.map((weatherCode, index) => (
                    <td key={index}>{weatherInterpretationRu[weatherCode]}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Col>
        ) : (
          <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spinner />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default WeatherPage;