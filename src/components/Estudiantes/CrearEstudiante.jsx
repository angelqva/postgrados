import * as React from 'react';
import { Box, TextField, Paper, Grid, Typography} from '@mui/material';
import { FormControl, FormHelperText, MenuItem } from '@mui/material';

const grender = [
  {
    value: 'femenino',
    label: 'Femenino',
  },
  {
    value: 'masculino',
    label: 'Masculino',
  }
];
function CrearEstudiante() {

    const [grender, setGrender] = React.useState('masculino');

    const handleChange = (event) => {
        setGrender(event.target.value);
    };
    return (
        <Box
            sx={{
                alignItems: 'center',
                '& > :not(style)': { m:'24px 8px 8px 8px' },
                width:'100%'
            }}
            component="form"
            >
            <Paper elevation={3} sx={{ p:2}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h6" sx={{
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
                                label="Nombre y Apellidos"
                            />
                            <FormHelperText>Introdusca su nombre completo</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className='form-control'>
                            <TextField
                                name='carnet_identidad'
                                label="Carnet de Identidad"
                                type={'number'}
                            />
                            <FormHelperText>Introdusca los 11 digitos del carnet</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className='form-control'>
                            <TextField
                                name='edad'
                                label="Edad"
                                type={'number'}
                            />
                            <FormHelperText>Introdusca su edad</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className='form-control'>
                            <TextField
                                name='especialidad'
                                label="Especialidad"
                            />
                            <FormHelperText>Introdusca su especialidad</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl className='form-control'>
                            <TextField
                                name="sexo"
                                select
                                label="Sexo"
                                value={grender}
                                onChange={handleChange}
                                >
                                {grender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormHelperText>Selecciona el sexo</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>            
            </Paper>
        </Box>
    )
}

export default CrearEstudiante
