
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import WeatherPage from '../WeatherPage/WeatherPage';
const AppRouter: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather/:city" element={<WeatherPage />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;