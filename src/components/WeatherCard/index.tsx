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

export default function WeatherCard() {
  const [city, setCity] = React.useState('Alvarães');
  const [latitude, setLatitude] = React.useState<number | undefined>(-3.221);
  const [longitude, setLongitude] = React.useState<number | undefined>(-64.804);

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const { data, refetch, isFetching } = useQuery('name_location', async () => {
    const response = await apiWeather.get(`/forecast.json?key=6862b4c8fbfc486bafd154914220804&q=${latitude}${','}${longitude}&days=1&aqi=yes&lang=pt`)
    console.log('response', response)
    return response;
  });

  React.useEffect(() => {
    let selectedCity = municipios.find(c => c.name === city);
    setLatitude(selectedCity?.coords.lat);
    setLongitude(selectedCity?.coords.lon);
    refetch();
  }, [city, isFetching]);

  return (
    <Card sx={{ display: 'flex' }}>
      {
        isFetching ?
          <CircularProgress />
          :
          <>
            <CardMedia
              component="img"
              sx={{ width: 300, backgroundColor: '#172243' }}
              image={`/animation-ready/${data?.data.current.condition.code}.svg`}
              // image={'//cdn.weatherapi.com/weather/64x64/day/395.png'}
              alt="Animação previsão do tempo"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#172243' }}>
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
              </CardContent>
              <CardActions>
                <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                  Máx: {data?.data.forecast.forecastday[0].day.maxtemp_c} °C
                </Typography>
                <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                  Mín: {data?.data.forecast.forecastday[0].day.mintemp_c} °C
                </Typography>
                <Typography variant="subtitle1" style={{ color: '#fff' }} component="div">
                  Sensação Térmica: {data?.data.current.feelslike_c} °C
                </Typography>
              </CardActions>
            </Box>
          </>
      }
    </Card>
  );
}