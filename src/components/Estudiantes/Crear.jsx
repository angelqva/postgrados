import * as React from 'react';
import { Box, TextField, Paper, Grid, Typography} from '@mui/material';
import { FormControl, FormHelperText, MenuItem } from '@mui/material';

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

    const handleSelectChange = (event) => {
        setGrender(event.target.value);
    };
    
    return (
        <Box
            sx={{
                alignItems: 'center',
                '& > :not(style)': { m:'24px 8px 8px 8px' },
                width:'100%'
            }}
            component='form'
            >
            <Paper elevation={3} sx={{ p:2}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant='h6' sx={{
                            fontSize:{ xs:'1em', md:'1.5em'},
                            textAlign: 'center',
                            mt:2
                            }}>
                            Datos del Estudiante
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
                                <TextField
                                    name='year_graduacion'
                                    label='Año de Graduación'
                                    type={'number'}
                                />
                                <FormHelperText>Año de Graduación</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Crear
