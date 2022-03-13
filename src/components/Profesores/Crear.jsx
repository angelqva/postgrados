import * as React from 'react';
import { Box, TextField, Paper, Grid, Typography} from '@mui/material';
import { FormControl, FormHelperText, MenuItem, Button } from '@mui/material';

const cientificas = [
    'Ninguna',
    'Master en Ciencias',
    'Doctor en Ciencias',
];

const docentes = [
    'Asistente',
    'Ausiliar',
    'Instructor',
    'Titular'
];


function Crear({
    doCreate = true,
    crearFunction = () => { },
    editFunction = () => { },
    doEdit = false,
    item = {
        id: null,
        carnet_identidad: '',
        nombre: '',
        apellidos: '',
        edad: '',
        especialidad: '',
        categoria_docente: 'Instructor',
        categoria_cientifica: 'Ninguna',
    },
    errores = [] }){    
    const [nombre, setNombre] = React.useState(item.nombre);
    const [carnet_identidad, setCarnet_identidad] = React.useState(item.carnet_identidad)
    const [apellidos, setApellidos] = React.useState(item.apellidos)
    const [edad, setEdad] = React.useState(item.edad)
    const [especialidad, setEspecialidad] = React.useState(item.especialidad)
    const [categoria_docente, setCategoria_docente] = React.useState(item.categoria_docente)
    const [categoria_cientifica, setCategoria_cientifica] = React.useState(item.categoria_cientifica)
    const handleNombre = (event) => {
        setNombre(event.target.value);
    }
    const handleApellidos = (event) => {
        setApellidos(event.target.value);
    }
    const handleCarnet_Identidad = (event) => {
        setCarnet_identidad(event.target.value);
    }
    const handleEdad = (event) => {
        setEdad(event.target.value);
    }
    const handleEspecialidad = (event) => {
        setEspecialidad(event.target.value);
    }
    const handleCientifica = (event) => {
        setCategoria_cientifica(event.target.value);
    };
    const handleDocente = (event) => {
        setCategoria_docente(event.target.value);
    };
    const handleSubmit = (event) => {
        event.prevenDefault();
        console.log('asdasd');
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    alignItems: 'center',
                    '& > :not(style)': { m:'48px 8px 8px 8px' },
                    width:'100%'
                }}
                component='div'
                >
                <Paper elevation={3} sx={{ p:2}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom={false} variant='h6' className='card-title' sx={{
                                fontSize:{ xs:'1.2em', md:'1.5em'},
                                }}>
                                Datos del Profesor
                            </Typography>
                            <Typography gutterBottom={false} variant='p' className='card-subTitle' component={'p'} sx={{
                                fontSize: { xs:'1em', md:'1.25em'},
                                }}>
                                Complete los siguientes campos
                            </Typography>
                        </Grid>
                        
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='nombre'
                                        label='Nombre'
                                        value={nombre}
                                        onChange={handleNombre}
                                    />
                                    <FormHelperText>Introdusca el nombre</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='apellidos'
                                        label='Apellidos'
                                        value={apellidos}
                                        onChange={handleApellidos}
                                    />
                                    <FormHelperText>Introdusca los Apellidos</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='carnet_identidad'
                                        label='Carnet de Identidad'
                                        type={'number'}
                                        value={carnet_identidad}
                                        onChange={handleCarnet_Identidad}
                                    />
                                    <FormHelperText>Introdusca los 11 digitos del carnet</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='edad'
                                        label='Edad'
                                        type={'number'}
                                        value={edad}
                                        onChange={handleEdad}
                                    />
                                    <FormHelperText>Introdusca su edad</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='especialidad'
                                        label='Especialidad'
                                        value={especialidad}
                                        onChange={handleEspecialidad}
                                    />
                                    <FormHelperText>Introdusca su especialidad</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='categoria_cientifica'
                                        select
                                        label='Categoría Científica'
                                        value={categoria_cientifica}
                                        onChange={handleCientifica}
                                        >
                                        {cientificas.map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText>Seleccione una Categoría</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl className='form-control'>
                                    <TextField
                                        name='categoria_docente'
                                        select
                                        label='Categoría Docente'
                                        value={categoria_docente}
                                        onChange={handleDocente}
                                        >
                                        {docentes.map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <FormHelperText>Seleccione una Categoría</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl className='form-control'>
                                    <Button fullWidth type='submit' variant="contained" size="large">
                                        Guardar Profesor
                                    </Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </form>
    )
}

export default Crear
