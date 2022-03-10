import * as React from 'react';
import { Box, TextField, Paper, Grid, Typography} from '@mui/material';
import { FormControl, FormHelperText, MenuItem, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker'; 

const grenders = [
  {
    value: 'femenino',
    label: 'Femenino',
  },
  {
    value: 'masculino',
    label: 'Masculino',
  }
];

function Crear() {

    const [grender, setGrender] = React.useState('masculino');
    const [date, setDate] = React.useState(null);

    const handleSelectChange = (event) => {
        setGrender(event.target.value);
    };
    
    return (
        <Box
            sx={{
                alignItems: 'center',
                '& > :not(style)': { m:'48px 8px 8px 8px' },
                width:'100%'
            }}
            component='form'
            >
            <Paper elevation={3} sx={{ p:2}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom={false} variant='h6' className='card-title' sx={{
                            fontSize:{ xs:'1.2em', md:'1.5em'},
                            }}>
                            Datos del Estudiante
                        </Typography>
                        <Typography gutterBottom={false} variant='p' className='card-subTitle' component={'p'} sx={{
                            fontSize: { xs:'1em', md:'1.25em'},
                            }}>
                            Complete los siguientes campos
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className='form-control'>
                            <TextField
                                name='nombre_apellidos'
                                label='Nombre y Apellidos'
                            />
                            <FormHelperText>Introdusca su nombre completo</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className='form-control'>
                            <TextField
                                name='carnet_identidad'
                                label='Carnet de Identidad'
                                type={'number'}
                            />
                            <FormHelperText>Introdusca los 11 digitos del carnet</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <TextField
                                    name='edad'
                                    label='Edad'
                                    type={'number'}
                                />
                                <FormHelperText>Introdusca su edad</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <TextField
                                    name='especialidad'
                                    label='Especialidad'
                                />
                                <FormHelperText>Introdusca su especialidad</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <TextField
                                    name='sexo'
                                    select
                                    label='Sexo'
                                    value={grender}
                                    onChange={handleSelectChange}
                                    >
                                    {grenders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <FormHelperText>Selecciona el sexo</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <TextField
                                    name='nacionalidad'
                                    label='Nacionalidad'
                                />
                                <FormHelperText>Introdusca su nacionalidad</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <TextField
                                    name='residencia'
                                    label='Residencia'
                                />
                                <FormHelperText>Introdusca su residencia</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl className='form-control'>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label='Año de Graduación'
                                        name='year_graduacion'
                                        value={date}
                                        views={['year']}
                                        onChange={(newValue) => {
                                        setDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                                <FormHelperText>Año de Graduación</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl className='form-control'>
                                <Button fullWidth variant="contained" size="large">
                                    Guardar Estudiante
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Crear
