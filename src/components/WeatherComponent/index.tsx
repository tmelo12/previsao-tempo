'use client'
import ReactWeather, { useVisualCrossing } from 'react-open-weather'
import { useState, useEffect } from 'react'

export default function WeatherComponent() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: 'RR7S5LQMPP4CUQEG5CF9LN2JV',
    lat: latitude,
    lon: longitude,
    lang: 'pt',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  useEffect(() => {
    // Verifica se o navegador suporta a API de Geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      locationLabel={'Nome Municipio'}
      data={data}
      lang="pt"
      unitsLabels={{ temperature: 'º C', windSpeed: 'Km/h' }}
    // showForecast
    />
  )
}
