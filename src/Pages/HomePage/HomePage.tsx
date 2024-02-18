import { Container, Row, Col  } from "react-bootstrap";
import WeatherCard from "../../components/WeatherCard/WeatherCard";

const cities = [
  "Moscow",
  "St Petersburg",
  "Rostov-on-Don",
  "Vladivostok",
  "Krasnodar",
  "Yekaterinburg",
];
const App = () => {
  return (
    <>
      <Container>
        <h1>Погода в городах России</h1>
        <Row>
          {cities.map((city) => (
            <Col key={city} xs={12} sm={6} md={4} lg={3}>
              <WeatherCard city={city} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;
