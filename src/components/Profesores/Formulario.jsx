import * as React from 'react';
import { Box, Paper, Grid, Typography} from '@mui/material';
import { Button, FormControl } from '@mui/material';
import FormInputText from '../Utils/FormInputText';
import FormInputTextSelect from '../Utils/FormInputTextSelect';
import { useForm } from 'react-hook-form';

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
    crearFunction,
    editFunction,
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
    errores = {
        carnet_identidad: '',
        nombre: '',
        apellidos: '',
        edad: '',
        especialidad: '',
        categoria_docente: '',
        categoria_cientifica: '',
    },
    dispatchSolveError}) {
    const { handleSubmit, control, setValue} = useForm();
    const [nombre, setNombre] = React.useState(item.nombre);
    const [carnet_identidad, setCarnet_identidad] = React.useState(item.carnet_identidad)
    const [apellidos, setApellidos] = React.useState(item.apellidos)
    const [edad, setEdad] = React.useState(item.edad)
    const [especialidad, setEspecialidad] = React.useState(item.especialidad)
    const [categoria_docente, setCategoria_docente] = React.useState(item.categoria_docente)
    const [categoria_cientifica, setCategoria_cientifica] = React.useState(item.categoria_cientifica)
    
    const handleNombre = (event) => {
        setNombre(event.target.value);
        dispatchSolveError({ nombre: [] });
    }
    const handleApellidos = (event) => {
        setApellidos(event.target.value);
        dispatchSolveError({ apellidos: [] });
    }
    const handleCarnet_Identidad = (event) => {
        setCarnet_identidad(event.target.value);
        dispatchSolveError({ carnet_identidad: [] });
    }
    const handleEdad = (event) => {
        setEdad(event.target.value);
        dispatchSolveError({ edad: [] });
    }
    const handleEspecialidad = (event) => {
        setEspecialidad(event.target.value);
        dispatchSolveError({ especialidad: [] });
    }
    const handleCientifica = (event) => {
        setCategoria_cientifica(event.target.value);
        dispatchSolveError({ categoria_cientifica: [] });
    };
    const handleDocente = (event) => {
        setCategoria_docente(event.target.value);
        dispatchSolveError({ categoria_docente: [] });
    };
    const onSubmit = (data) => {
        console.log(data)
    };

    return (
            <Box
                sx={{
                    alignItems: 'center',
                    '& > :not(style)': { m:'48px 8px 8px 8px' },
                    width:'100%'
                }}
                component='form'
                onSubmit={handleSubmit(onSubmit)}
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
                                <FormInputText
                                name='nombre'
                                label='Nombre'
                                control={control}
                                helperText='Introdusca el nombre'
                                handleChange={handleNombre}
                                value={nombre}
                                setValue={setValue}
                                responseErrors={ errores.nombre.length>0 ? errores.nombre :null}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='apellidos'
                                label='Apellidos'
                                control={control}
                                helperText='Introdusca los Apellidos'
                                handleChange={handleApellidos}
                                value={apellidos}
                                setValue={setValue}
                                responseErrors={ errores.apellidos.length>0 ? errores.apellidos :null}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <FormInputText
                                name='carnet_identidad'
                                label='Carnet de Identidad'
                                type='number'
                                control={control}
                                helperText='Introdusca los 11 digitos del carnet'
                                handleChange={handleCarnet_Identidad}
                                value={carnet_identidad}
                                setValue={setValue}
                                responseErrors={ errores.carnet_identidad.length>0 ? errores.carnet_identidad :null}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='edad'
                                label='Edad'
                                type='number'
                                control={control}
                                helperText='Introdusca su edad'
                                handleChange={handleEdad}
                                value={edad}
                                setValue={setValue}
                                responseErrors={ errores.edad.length>0 ? errores.edad :null}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='especialidad'
                                label='Especialidad'
                                control={control}
                                helperText='Introdusca su especialidad'
                                handleChange={handleEspecialidad}
                                value={especialidad}
                                setValue={setValue}
                                responseErrors={ errores.especialidad.length>0 ? errores.especialidad :null}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormInputTextSelect
                                name='categoria_cientifica'
                                label='Categoría Científica'
                                control={control}
                                options={cientificas}
                                helperText='Seleccione una Categoría'
                                handleChange={handleCientifica}
                                value={categoria_cientifica}
                                setValue={setValue}
                                responseErrors={ errores.categoria_cientifica.length>0 ? errores.categoria_cientifica :null}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputTextSelect
                                name='categoria_docente'
                                label='Categoría Docente'
                                control={control}
                                options={docentes}
                                helperText='Seleccione una Categoría'
                                handleChange={handleDocente}
                                value={categoria_docente}
                                setValue={setValue}
                                responseErrors={ errores.categoria_docente.length>0 ? errores.categoria_docente :null}
                                />
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
    )
}

export default Crear
