/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Paper, Grid, Typography} from '@mui/material';
import { Button, FormControl } from '@mui/material';
import FormInputText from '../Utils/FormInputText';
import { useForm } from 'react-hook-form';
import FormInputChecked from '../Utils/FormInputChecked';
import FormInputDate from '../Utils/FormInputDate';
import FormAutocomplete from '../Utils/FormAutocomplete';
import { Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    profesores=[],
    estudiantes=[],
    errores = {
        tema: '',
        codigo: '',
        cantidad_horas: '',
        impartido_universidad: '',
        inicio: '',
        fin: '',
        profesor: '',
        estudiantes:''
    },
    dispatchSolveError }) {
    
    const { handleSubmit, control,reset, setError, setValue, clearErrors } = useForm({
        defaultValues: {
            id: null,
            tema: '',
            codigo: '',
            cantidad_horas: '',
            impartido_universidad: true,
            inicio: null,
            fin: null,
            profesor: null,
            estudiantes:[]
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
            setValue('tema', item.tema, { shouldValidate: true });
            setValue('codigo', item.codigo, { shouldValidate: true });
            setValue('cantidad_horas', item.cantidad_horas, { shouldValidate: true });
            setValue('impartido_universidad', item.impartido_universidad, { shouldValidate: true });
            setValue('inicio', item.inicio, { shouldValidate: true });
            setValue('fin', item.fin, { shouldValidate: true });
            setValue('profesor', item.profesor, { shouldValidate: true });
            setValue('estudiantes', item.estudiantes, { shouldValidate: true });
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
                                Postgrado Nacional
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
                                name='tema'
                                label='Tema'
                                control={control}
                                helperText='Introdusca el Tema'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                name='codigo'
                                label='Código'
                                control={control}
                                helperText='Introdusca el código'
                                solveError={solveError}
                                rules={{
                                    required: 'Este campo es requerido',
                                }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormInputText
                                    name='cantidad_horas'
                                    label='Cantidad de Horas'
                                    type='number'
                                    control={control}
                                    helperText='Cantidad horas clases'
                                    solveError={solveError}
                                    rules={{
                                        required: 'Este campo es requerido',
                                        min:{
                                            value: 1,
                                            message:'Debe tener 1+ horas'
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputChecked
                                    name='impartido_universidad'
                                    label='Impartiodo en la Universidad'
                                    control={control}
                                    setValue={setValue}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormInputDate
                                    name='inicio'
                                    label='Inicio'
                                    control={control}
                                    rules={{
                                        required: 'Este campo es requerido'
                                    }}
                                    setValue={setValue}
                                    helperText='Fecha de Inicio'
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormInputDate
                                    name='fin'
                                    label='Fin'
                                    control={control}
                                    rules={{
                                        required: 'Este campo es requerido'
                                    }}
                                    setValue={setValue}
                                    helperText='Fecha de Fin'
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormAutocomplete
                                    name='profesor'
                                    control={control}
                                    rules={{
                                        required: 'Este campo es requerido'
                                    }}
                                    setValue={setValue}
                                    label='Profesor'
                                    helperText='Elija al Profesor'
                                    solveError={solveError}
                                    options={profesores}
                                    autoHighlight
                                    getOptionLabel={(option) => option.nombre}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            {option.nombre} {option.apellidos}
                                        </Box>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormAutocomplete
                                    name='estudiantes'
                                    control={control}
                                    rules={{
                                        required: 'Este campo es requerido'
                                    }}
                                    setValue={setValue}
                                    label='Estudiantes'
                                    helperText='Elija los Estudiantes'
                                    solveError={solveError}
                                    options={estudiantes}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    disableCloseOnSelect
                                    multiple
                                    getOptionLabel={(option) => option.nombre}
                                    renderOption={(props, option, { selected }) => (
                                        <li {...props}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.nombre} {option.apellidos}
                                        </li>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        {doCreate
                            ? (<Grid container>
                                    <Grid item xs={12}>
                                        <FormControl className='form-control'>
                                            <Button fullWidth type='submit' variant="contained" size="large">
                                                Guardar Postgrado
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
                                            Editar Postgrado
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