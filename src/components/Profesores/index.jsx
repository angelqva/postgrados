/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Grid } from '@mui/material';
//import Crear from './Crear'
import Formulario from './Formulario'
import { v4 as uuidv4 } from 'uuid';
import Tabla from '../Utils/Tabla';
import { useDispatch, useSelector } from 'react-redux';
import { getListado, setErrores, setEliminados, doEliminar, doCrear, setCreando, resetItem, findItem, setBuscando, doEditar, setEditando} from '../../redux/profesores'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Profesores() {
    const columns = [    
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 100,
        },
        {
            field: 'apellidos',
            headerName: 'Apellidos',
            width: 150,
        },
        {
            field: 'carnet_identidad',
            headerName: 'CI',
            width: 140,
        },
        {
            field: 'edad',
            headerName: 'Edad',
            type: 'number',
            width: 60,
        },
        {
            field: 'especialidad',
            headerName: 'Especialidad',        
            width: 140,
        },
        {
            field: 'categoria_cientifica',
            headerName: 'Cientifica',
            width:140,
        },
        {
            field: 'categoria_docente',
            headerName: 'Docente',        
            width: 140,
        },
    ];
    const dispatch = useDispatch();
    const lista_profesores = useSelector(store => store.profesores.listado);
    const eliminados = useSelector(store => store.profesores.eliminados);
    const errRead = useSelector(store => store.profesores.errores.read);
    const errEliminar = useSelector(store => store.profesores.errores.eliminar);
    const errFormulario = useSelector(store => store.profesores.errores.formulario);
    const creando = useSelector(store => store.profesores.creando);
    const buscando = useSelector(store => store.profesores.buscando);
    const editando = useSelector(store => store.profesores.editando);
    const item = useSelector(store => store.profesores.item);
    const [doCreate, setDoCreate] = React.useState(true);
    const [doEdit, setDoEdit] = React.useState(false);
    const [doReset, setDoReset] = React.useState(false);
    const tableTitle = 'Listado de Profesores';
    //listado
    React.useEffect(() => {
        dispatch(getListado());
        return () => { 
            cancelEdit();
        }
    }, []);
    React.useEffect(() => {
        if (errRead.length > 0) {
            var err = []
            errRead.forEach(element => err.push(element.msg));
            var str = err.join(', ');
            MySwal.fire({
                title: 'Se Encontraron Problemas',
                text: str,
                icon: 'error',
                confirmButtonText: 'Continuar',
                didOpen: () => { 
                    MySwal.hideLoading();
                }
            }).then(() => {
                setDoCreate(true);
                setDoEdit(false);
                dispatch(setErrores('eliminar','read',[]));
            })
        }
    }, [errRead]);
    //end listado
    //delete
    const [totalDelete, setTotalDelete] = React.useState(0);
    const [showDelete, setShowDelete] = React.useState(false);
    const finishDelete = React.useMemo(() => {
        if (totalDelete === eliminados) {
            return true;
        }
        return false;
    }, [totalDelete, eliminados]);
    React.useEffect(() => {
        if (showDelete && finishDelete) {
            if (errEliminar.length > 0) {
                var err = []
                errEliminar.forEach(element => err.push(element.msg));
                var str = err.join(', ');
                MySwal.close();
                const otherSwal = withReactContent(Swal);
                otherSwal.fire({
                    title: 'Acción con error',
                    text: str,
                    icon: 'error',
                    confirmButtonText: 'Continuar',
                })
                dispatch(setErrores('eliminar', 'eliminar', []));
                dispatch(setEliminados(0));
                setTotalDelete(0);
                setShowDelete(false);
            } else {
                MySwal.close();
                const otherSwal = withReactContent(Swal);
                otherSwal.fire({
                    title: 'Eliminados Correctamente',
                    text: 'Los Estudiantes han sido eliminados',
                    icon: 'success',
                    
                });
                dispatch(setErrores('eliminar', 'eliminar', []));
                dispatch(setEliminados(0));
                setTotalDelete(0);
                setShowDelete(false);
            }
        }
            
        
    },[showDelete, finishDelete, errEliminar]);
    const sendDelete = (ids) => {
        MySwal.fire({
            title: 'Estas Seguro?',
            text: "Se eliminaran los Estudiantes seleccionados!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminalos!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setTotalDelete(ids.length);
                dispatch(setEliminados(0));
                setShowDelete(true);
                dispatch(doEliminar(ids));
                MySwal.fire({
                    title: 'Espere, estamos:',
                    html: 'Eliminando Esutidiantes',
                    allowOutsideClick: false,
                    didOpen: () => {
                        MySwal.showLoading()
                    },
                })
            }
            else if (result.dismiss === Swal.DismissReason.cancel){
                MySwal.fire(
                    'Acción Cancelada',
                    'Todo se mantiene igual',
                    'error'
                )
            }
        })
    }
    //end delete
    //crear
    const dispatchSolveError = (error)=>{
        dispatch(setErrores('eliminar', 'formulario', error));
    }
    const crearProfesor = (profesor) => {
        dispatch(setCreando(true));
        dispatch(doCrear(profesor));
        MySwal.fire({
            title: 'Espere, estamos:',
            text: `Creando al Profesor ${profesor.nombre} ${profesor.apellidos}`,
            allowOutsideClick: false,
            didOpen: () => {
                MySwal.showLoading()
            },
        })
    }
    const cantReset = () => {
        setDoReset(false);
        MySwal.fire({
            title: 'Error',
            text: 'Revise los siguientes errores',
            icon: 'error',
            didOpen: () => { 
                MySwal.hideLoading();
            }
        })
    }
    const finishReset = () => {
        if (doEdit){ 
            setDoReset(false);
            setDoEdit(false);
            setDoCreate(true);
            MySwal.fire({
                title: 'Exito',
                text: 'Editado Correctamente',
                icon: 'success',
                didOpen: () => { 
                    MySwal.hideLoading();
                }
            })
        }
        if (doCreate) { 
            setDoReset(false);
            MySwal.fire({
                title: 'Creado Satisfactoriamente',
                text: 'El Profesor: '+item.nombre+' '+item.apellidos,
                icon: 'success',
                didOpen: () => { 
                    MySwal.hideLoading();
                }
            }).then(()=>dispatch(resetItem()))
        }
        
    }
    React.useEffect(() => {
        if (!creando) {
            setDoReset(true);
        }
    },[creando]);
    //endCrear
    //edit
    const sendEdit = (id) => {
        dispatch(resetItem());
        dispatch(setBuscando(true));
        dispatch(findItem(id));
        MySwal.fire({
            title: 'Espere, estamos:',
            text: `Buscando cargando los datos del Profesor`,
            allowOutsideClick: false,
            didOpen: () => {
                MySwal.showLoading()
            },
        })
    }
    const cancelEdit = () => {
        dispatch(resetItem());
        setDoCreate(true);
        setDoEdit(false);
        //window.location.reload(false);
     }
    React.useEffect(() => {
        if (!buscando) { 
            if (!!item.id) {
                setDoCreate(false);
                setDoEdit(true);
                MySwal.fire({
                    title: 'Encontrado!!',
                    text: 'Proceda a editar sus Datos',
                    icon: 'success',
                    didOpen: () => {
                        MySwal.hideLoading();
                    }
                })
            }
        }
    },[buscando])

    const editProfesor = (profesor) => {
        var partialEdit = {};
        var cont = 0;
        for (const property in item) { 
            if (property !== "id") {
                if (property === "edad") { 
                    if (parseInt(profesor[property]) !== item[property]) { 
                        partialEdit[property] = parseInt(profesor[property]);
                        cont++
                    }
                }
                else if (profesor[property] !== item[property]) { 
                    partialEdit[property] = profesor[property];
                    cont++
                }
            }
        }
        if (cont >= 1) {
            console.log(doEdit);
            dispatch(setEditando(true));
            dispatch(doEditar(partialEdit))
            MySwal.fire({
                title: 'Espere, estamos:',
                text: `Guardando los cambios`,
                allowOutsideClick: false,
                didOpen: () => {
                    MySwal.showLoading()
                },
            })
        }
        else { 
            MySwal.fire({
                title: 'Alerta',
                text: 'No ha realizado ningun cambio',
                icon: 'warning'
            })
        }
    }
    
    React.useEffect(() => { 
        if (!editando) {
            setDoReset(true);
        }
    },[editando]);
    //endEdit
    


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    {/* <Crear crearProfesor={crearProfesor} /> */}
                    <Formulario
                        dispatchSolveError={dispatchSolveError}
                        crearFunction={crearProfesor}
                        editFunction={editProfesor}
                        errores={errFormulario}
                        doCreate={doCreate}
                        doEdit={doEdit}
                        cancelEdit={cancelEdit}
                        doReset={doReset}
                        finishReset={finishReset}
                        item={item}
                        cantReset={cantReset}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Tabla
                        key={uuidv4()}
                        listado={lista_profesores}
                        columns={columns}
                        title={tableTitle}
                        sendEdit={sendEdit}
                        sendDelete ={sendDelete}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
