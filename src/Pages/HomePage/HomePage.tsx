import { Container, Row, Col, Spinner } from "react-bootstrap";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { cities } from "../../utils/WeatherCode";

const App = () => {
  return (
    <>
      <Container>
        <h1>Погода в городах России</h1>
        {cities ? (
          <Row>
            {cities.map((city: string, i: number) => (
              <Col key={i} xs={12} sm={6} md={4} lg={3}>
                <WeatherCard city={city} />
              </Col>
            ))}
          </Row>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
};

export default App;
