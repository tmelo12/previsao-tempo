'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { municipios } from '@/constants/municipios';
import { useQuery } from 'react-query';
import { apiWeather } from '@/services/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useMediaQuery } from '@mui/material';

export default function WeatherCard() {
  const [city, setCity] = React.useState('Alvarães');
  const [latitude, setLatitude] = React.useState<number | undefined>(-3.221);
  const [longitude, setLongitude] = React.useState<number | undefined>(-64.804);

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const { data, refetch, isFetching } = useQuery('name_location', async () => {
    const response = await apiWeather.get(`/forecast.json?key=6862b4c8fbfc486bafd154914220804&q=${latitude},${longitude}&days=1&aqi=yes&lang=pt`)
    console.log('response', response)
    return response;
  });

  React.useEffect(() => {
    let selectedCity = municipios.find(c => c.name === city);
    setLatitude(selectedCity?.coords.lat);
    setLongitude(selectedCity?.coords.lon);
    refetch();
  }, [city]);

  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <div>
      <Card sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', maxWidth: isMobile ? 400 : '100%', margin: isMobile ? '0 auto' : 0 }}>
        {
          isFetching ?
            <CircularProgress />
            :
            <>
              <CardMedia
                component="img"
                sx={{ width: 400, backgroundColor: '#172243' }}
                image={data?.data.current.is_day === 1 ? `/animation-ready/${data?.data.current.condition.code}.svg` : `/animation-ready/${data?.data.current.condition.code}_night.svg`}
                // image={'//cdn.weatherapi.com/weather/64x64/day/116.png'}
                alt="Animação previsão do tempo"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#172243', padding: 5 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                    Selecione o município...
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      startAdornment={<LocationOnIcon style={{ color: '#172243' }} />}
                      id="demo-simple-select"
                      value={city}
                      onChange={handleChange}
                      fullWidth
                      style={{ backgroundColor: '#FFF', borderColor: '#FFF' }}
                    >
                      {municipios.map(item => (
                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                  <Typography variant="h3" style={{ color: '#ff9933', fontWeight: 'bold' }} component="div">
                    {data?.data.current.temp_c} °C
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                    {data?.data.current.condition.text}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: '#fff', alignItems: 'center', display: 'flex' }} component="div">
                    <img src={`/animation-ready/humidity.svg`} width={50} height={50} style={{ float: 'left' }} /> Humidade: {data?.data.current.humidity}%
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: '#fff', alignItems: 'center', display: 'flex' }} component="div">
                    <img src={`/animation-ready/wind.svg`} width={50} height={50} style={{ float: 'left' }} /> Vento: apróx. {data?.data.current.wind_kph}km/h
                  </Typography>
                </CardContent>
                <CardActions>
                  <img src={`/animation-ready/thermometer-mercury.svg`} width={50} height={50} />
                  <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                    Máx: {data?.data.forecast.forecastday[0].day.maxtemp_c}°C
                  </Typography>
                  <img src={`/animation-ready/thermometer-mercury-cold.svg`} width={50} height={50} />
                  <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                    Mín: {data?.data.forecast.forecastday[0].day.mintemp_c}°C
                  </Typography>
                  <img src={`/animation-ready/thermometer.svg`} width={50} height={50} />
                  <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                    Sensação Térmica: {data?.data.current.feelslike_c}°C
                  </Typography>
                </CardActions>
                <Typography variant="subtitle2" style={{ color: '#fff', fontSize: 12 }} component="div">
                  * Última atualização em: {new Date(data?.data.current.last_updated).toLocaleString()} via <a target='_blank' href='https://www.weatherapi.com/' style={{ color: '#FFF', fontWeight: 'bold', fontSize: 12 }}>Weather Api</a>
                </Typography>
              </Box>
            </>
        }
      </Card>
    </div>
  );
}