/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Paper, Grid, Typography} from '@mui/material';
import { Button, FormControl } from '@mui/material';
import FormInputText from '../Utils/FormInputText';
import FormInputTextSelect from '../Utils/FormInputTextSelect';
import { useForm } from 'react-hook-form';

const cientificas = [
    'Ninguna',
    'Master',
    'Doctor',
];

const docentes = [
    'Asistente',
    'Ausiliar',
    'Instructor',
    'Titular'
];


function Formulario({
    doCreate = true,
    crearFunction,
    editFunction,
    cancelEdit,
    doEdit = false,
    doReset=false,
    finishReset,
    cantReset,
    item,
    errores = {
        carnet_identidad: '',
        nombre: '',
        apellidos: '',
        edad: '',
        especialidad: '',
        categoria_docente: '',
        categoria_cientifica: '',
    },
    dispatchSolveError }) {
    
    const { handleSubmit, control,reset, setError, setValue, clearErrors } = useForm({
        defaultValues: {
            carnet_identidad: '',
            nombre: '',
            apellidos: '',
            edad: '',
            especialidad: '',
            categoria_docente: 'Instructor',
            categoria_cientifica: 'Ninguna'
        }
    });
    React.useEffect(() => {
        if (doReset) {
            if (doCreate) {
                if (!!item.id) {
                    reset({});
                    finishReset();
                }
                else {
                    cantReset();
                }
            }
            if (doEdit) { 
                if (!!item.id) {
                    cantReset();
                }
                else { 
                    reset({});
                    finishReset();
                }
            }
        }
    }, [doReset]);
    React.useEffect(() => {
        if (doEdit) {
            setValue('nombre', item.nombre, { shouldValidate: true });
            setValue('apellidos', item.apellidos, { shouldValidate: true });
            setValue('carnet_identidad', item.carnet_identidad, { shouldValidate: true });
            setValue('edad', item.edad, { shouldValidate: true });
            setValue('especialidad', item.especialidad, { shouldValidate: true });
            setValue('categoria_docente', item.categoria_docente, { shouldValidate: true });
            setValue('categoria_cientifica', item.categoria_cientifica, { shouldValidate: true });
        }
        else {
            reset({});
        }
    },[doEdit]);
    React.useEffect(() => {
        for (const property in errores) {
            if(errores[property].length>0)
            setError(property, {
                type: "response",
                message: errores[property],
            });
        }
    },[errores, setError])
    const solveError = (property) => {
        var error = errores[property];
        if (error.length > 0) {
            dispatchSolveError({type:property, payload:''});
        }
    }
    const onSubmit = (data) => {
        if (doCreate) { 
            crearFunction(data)
        }
        if (doEdit) { 
            editFunction(data);
        }
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
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                    minLength: {
                                        value: 4,
                                        message:'Mayor de 4 caracteres'
                                    }
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='apellidos'
                                label='Apellidos'
                                control={control}
                                helperText='Introdusca los Apellidos'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                    minLength: {
                                        value: 4,
                                        message:'Mayor de 4 caracteres'
                                    }
                                }}
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
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                    minLength: {
                                        value: 11,
                                        message:'Debe tener 11 caracteres'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message:'Debe tener 11 caracteres'
                                    }
                                }}
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
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                    min: {
                                        value: 18,
                                        message:'Debe tener m??s de 18 a??os'
                                    }
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='especialidad'
                                label='Especialidad'
                                control={control}
                                helperText='Introdusca su especialidad'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                    minLength: {
                                        value: 4,
                                        message:'Debe tener m??s de 4 caracteres'
                                    },
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormInputTextSelect
                                name='categoria_cientifica'
                                label='Categor??a Cient??fica'
                                control={control}
                                options={cientificas}
                                helperText='Seleccione una Categor??a'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido'
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputTextSelect
                                name='categoria_docente'
                                label='Categor??a Docente'
                                control={control}
                                options={docentes}
                                helperText='Seleccione una Categor??a'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido'
                                }}
                                />
                            </Grid>
                        </Grid>
                        {doCreate
                            ? (<Grid container>
                                    <Grid item xs={12}>
                                        <FormControl className='form-control'>
                                            <Button fullWidth type='submit' variant="contained" size="large">
                                                Guardar Profesor
                                            </Button>
                                        </FormControl>
                                </Grid>
                            </Grid>)
                            : (<Grid container>
                                <Grid item xs={6}>
                                    <FormControl className='form-control'>
                                        <Button component='a' fullWidth onClick={()=>{
                                        cancelEdit();
                                        setTimeout(clearErrors("nombre"), 150);
                                        }} variant="outlined" size="large">
                                            Cancelar
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl className='form-control'>
                                        <Button fullWidth type='submit' variant="contained" size="large">
                                            Editar Profesor
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>)
                        }
                    </Grid>
                </Paper>
            </Box>
    )
}

export default Formulario
