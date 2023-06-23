'use client'
import ReactWeather, { useVisualCrossing } from 'react-open-weather'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { api } from '@/services/api'

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

  const nameLocal = useQuery('name_location', async () => {
    const response = await api.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/-3.0394191,-59.9450429?key=RR7S5LQMPP4CUQEG5CF9LN2JV&lang=pt&unitGroup=metric&iconSet=icons2&include=days,current&elements=datetimeEpoch,tempmax,tempmin,temp,humidity,windspeed,icon,description')
    return response.data.timezone;
  });

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      locationLabel={nameLocal.data ? nameLocal.data.slice(8) : 'Loading'}
      data={data}
      lang="pt"
      unitsLabels={{ temperature: 'º C', windSpeed: 'Km/h' }}
    // showForecast
    />
  )
}
