

import React, { useEffect, useState } from 'react';
import { 
  Cloud, 
  Droplets, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Thermometer, 
  Wind,
  Sun,
  Moon,
  CloudSun,
  Leaf,
  MapPin
} from 'lucide-react';
import axios from 'axios';
import NavbarComponent from './common/Navbar';


const WEATHER_API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY;

function LocationComponent() {
  const [weatherData, setWeatherData] = useState({});
  const { current, location } = weatherData;

  const [browserLocation, setBrowserLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setBrowserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setBrowserLocation((prev) => ({
            ...prev,
            error: error.message,
          }));
        }
      );
    } else {
      setBrowserLocation((prev) => ({
        ...prev,
        error: 'Geolocation not supported by your browser.',
      }));
    }

    (async () => {
      const options = {
        method: "GET",
        url: `https://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}`,
        params: {
          query: `${browserLocation.latitude},${browserLocation.longitude}`,
        },
      };
      try {
        const response = await axios.request(options);
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [browserLocation.latitude, browserLocation.longitude]);

  const getAirQualityStatus = (epaIndex) => {
    const statuses = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
    const colors = ['text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-purple-500', 'text-red-800'];
    return {
      status: statuses[epaIndex - 1] || 'Unknown',
      color: colors[epaIndex - 1] || 'text-gray-500'
    };
  };

  const airQuality = getAirQualityStatus(current?.air_quality?.['us-epa-index']);

  if (!current || !location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl font-medium">
          Loading weather data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          {/* Main Weather Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <div>
                    <h1 className="text-2xl font-bold">{location.name}</h1>
                    <p className="text-blue-100 text-sm">{location.region}, {location.country}</p>
                  </div>
                </div>
                <div className="text-sm text-blue-100">{location.localtime}</div>
              </div>
              
              <div className="mt-8 flex items-center justify-center">
                <div className="text-center">
                  <img 
                    src={current.weather_icons?.[0]} 
                    alt={current.weather_descriptions?.[0]}
                    className="w-24 h-24 mx-auto mb-2 drop-shadow-lg"
                  />
                  <p className="text-xl">{current.weather_descriptions?.[0]}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="text-6xl font-bold mb-2">{current.temperature}°C</div>
                <p className="text-blue-100">Feels like {current.feelslike}°C</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <WeatherDetail 
                  icon={<Wind className="w-5 h-5" />} 
                  title="Wind" 
                  value={`${current.wind_speed} km/h ${current.wind_dir}`} 
                />
                <WeatherDetail 
                  icon={<Droplets className="w-5 h-5" />} 
                  title="Humidity" 
                  value={`${current.humidity}%`} 
                />
                <WeatherDetail 
                  icon={<Eye className="w-5 h-5" />} 
                  title="Visibility" 
                  value={`${current.visibility} km`} 
                />
                <WeatherDetail 
                  icon={<Gauge className="w-5 h-5" />} 
                  title="Pressure" 
                  value={`${current.pressure} mb`} 
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Sun & Moon Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 backdrop-blur-sm bg-white/90">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                Sun & Moon
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SunMoonDetail icon={<Sunrise />} title="Sunrise" value={current?.astro?.sunrise} />
                <SunMoonDetail icon={<Sunset />} title="Sunset" value={current?.astro?.sunset} />
                <SunMoonDetail icon={<Moon />} title="Moonrise" value={current?.astro?.moonrise} />
                <SunMoonDetail icon={<CloudSun />} title="Moonset" value={current?.astro?.moonset} />
              </div>
            </div>

            {/* Air Quality Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 backdrop-blur-sm bg-white/90">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Air Quality
                </h3>
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${airQuality?.color} bg-opacity-10`}>
                  {airQuality?.status}
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {current?.air_quality && Object.entries(current.air_quality)
                  .filter(([key]) => key !== 'us-epa-index')
                  .map(([key, value]) => (
                    <AirQualityDetail 
                      key={key}
                      title={key.toUpperCase()}
                      value={value}
                      unit="μg/m³"
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeatherDetail({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
      <div className="text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SunMoonDetail({ icon, title, value }) {
  return (
    <div className="text-center p-4 rounded-2xl bg-amber-50/50 hover:bg-amber-50 transition-colors">
      <div className="text-amber-600 w-6 h-6 mx-auto mb-2">
        {icon}
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

function AirQualityDetail({ title, value, unit }) {
  return (
    <div className="text-center p-4 rounded-2xl bg-green-50/50 hover:bg-green-50 transition-colors">
      <p className="text-2xl font-semibold text-gray-900">{Math.round(value)}</p>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="text-xs text-gray-500">{unit}</p>
    </div>
  );
}

export default LocationComponent;