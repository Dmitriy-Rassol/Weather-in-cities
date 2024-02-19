import { useState, ChangeEvent } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

interface City {
  id: number;
  name: string;
  admin1: string;
}

const AutocompleteInput: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setLoading(true);
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${event.target.value}`
    );
    const data = (await response.json()) as City[];
    const result = data.results;
    setCities(result);
    setLoading(false);
  };

  const fetchWeatherData = async (city: string) => {
    try {
      const locationResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      const { latitude, longitude } = locationResponse.data.results[0];
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const handleCitySelection = (cityName: string) => {
    setInputValue(cityName);
    fetchWeatherData(cityName);
    setCities([]);
  };

  return (
    <Form>
      <Form.Control
        type="text"
        placeholder="Введите название города"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div style={{ position: "absolute", zIndex: 10 }}>
        <ListGroup>
          {loading ? (
            <div style={{ position: "absolute", zIndex: 10, top: 0}}>
              <Spinner />
            </div>
          ) : (
            Array.isArray(cities) &&
            cities.map((city) => (
              <Link
                to={`/weather/${city.name}?lat=${latitude}&lng=${longitude}`}
              >
                <ListGroup.Item
                  key={city.id}
                  action
                  onClick={() => handleCitySelection(city.name)}
                >
                  {city.name}, {city.admin1}
                </ListGroup.Item>{" "}
              </Link>
            ))
          )}
        </ListGroup>
      </div>
    </Form>
  );
};

export default AutocompleteInput;
