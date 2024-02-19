import { Container, Row, Col } from "react-bootstrap";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { cities } from "../../utils/WeatherCode";
import AutocompleteInput from "../../components/AutocompleteInput/AutocompleteInput";

const App = () => {
  return (
    <>
      <Container>
       < AutocompleteInput/>
        <h1>Погода в городах России</h1>
          <Row>
            {cities.map((city: string, i: number) => (
              <Col key={i} xs={12} sm={6} md={4} lg={3}>
                <WeatherCard city={city} />
              </Col>
            ))}
          </Row>
      </Container>
    </>
  );
};

export default App;
