import React from 'react';
import './App.css';
import WikipediaSearch from './components/WikipediaSearch';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/Newspage';
import LocationComponent from './components/UserLocationService';
import Testcomp from './components/common/Testcomp';
import InteractiveMap from './components/common/MapDisplay';
import EcosystemBooklet from './components/testing/Test1';
import MapPage from './pages/MapPage';
import WeatherDetails from './pages/WeatherDetails';
import EcoSearchPage from './pages/WikiSearch';
import LandingPage from './pages/LandingPage';
import EnvironmentalStudies from './components/LearningComponent/EnvironmentalStudies';
import OtherDetails from './pages/OtherDetails';

function App() {
  return (
    <>
    
    <div className=''>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<EcoSearchPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/location" element={<WeatherDetails />} />
          <Route path="/map" element={<MapPage />} />
          <Route path={"/details"} element={<OtherDetails />} />
          <Route path='/curloc' element={<LocationComponent />} />
        </Routes>
      </Router>
    </div>
    </>
  );
}

export default App;
