/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Grid } from '@mui/material';
//import Crear from './Crear'
import Formulario from './Formulario'
import { v4 as uuidv4 } from 'uuid';
import Tabla from '../Utils/Tabla';
import { useDispatch, useSelector } from 'react-redux';
import { getListado as profesoresList } from '../../redux/profesores';
import { getListado as estudiantesList } from '../../redux/estudiantes';
import { getListado, setErrores, setEliminados, doEliminar, doCrear, setCreando, resetItem, findItem, setBuscando, doEditar, setEditando} from '../../redux/nacionales'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function formatDate(d) {
    if (Object.prototype.toString.call(d) !== '[object Date]');
        d = new Date(d);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


export default function Nacionales() {
    const columns = [    
        {
            field: 'tema',
            headerName: 'Tema',
            width: 100,
        },
        {
            field: 'codigo',
            headerName: 'Codigo',
            width: 150,
        },
        {
            field: 'inicio',
            headerName: 'Inicio',
            width: 130,
        },
        {
            field: 'fin',
            headerName: 'Fin',
            width: 130,
        },
        {
            field: 'cantidad_horas',
            headerName: 'Horas Clases',
            width: 130,
        },
        {
            field: 'colegiatura',
            headerName: 'Colegiatura',
            width: 130,
        },
    ];
    const dispatch = useDispatch();
    const lista_nacionales = useSelector(store => store.nacionales.listado);
    const lista_profesores = useSelector(store => store.profesores.listado);
    const lista_estudiantes = useSelector(store => store.estudiantes.listado);
    const eliminados = useSelector(store => store.nacionales.eliminados);
    const errRead = useSelector(store => store.nacionales.errores.read);
    const errEliminar = useSelector(store => store.nacionales.errores.eliminar);
    const errFormulario = useSelector(store => store.nacionales.errores.formulario);
    const creando = useSelector(store => store.nacionales.creando);
    const buscando = useSelector(store => store.nacionales.buscando);
    const editando = useSelector(store => store.nacionales.editando);
    const item = useSelector(store => store.nacionales.item);
    const [doCreate, setDoCreate] = React.useState(true);
    const [doEdit, setDoEdit] = React.useState(false);
    const [doReset, setDoReset] = React.useState(false);
    const tableTitle = 'Postgrados Nacionales';
    //listado
    React.useEffect(() => {
        dispatch(getListado());
        dispatch(profesoresList());
        dispatch(estudiantesList());
        return () => { 
            setDoEdit(false);
            setDoCreate(true);
            dispatch(resetItem());
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
                    text: 'Los Postgrados Nacionales han sido eliminados',
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
            text: "Se eliminaran los Postgrados seleccionados!",
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
                    html: 'Eliminando Postgrados',
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
    
    const crearPostgrado = (Postgrado) => {
        dispatch(setCreando(true));
        var profesor = Postgrado.profesor;
        Postgrado.profesor = profesor.id;
        var estudiantes = [];
        Postgrado.estudiantes.forEach(element => estudiantes.push(element.id));
        Postgrado.estudiantes = estudiantes;
        Postgrado.inicio = formatDate(Postgrado.inicio);
        Postgrado.fin = formatDate(Postgrado.fin);
        dispatch(doCrear(Postgrado));
        MySwal.fire({
            title: 'Espere, estamos:',
            text: `Creando al Postgarado ${Postgrado.tema}-${Postgrado.codigo}`,
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
                text: `El Postgrado: ${item.tema}-${item.codigo}`,
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
        setDoCreate(true);
        setDoEdit(false);
        dispatch(resetItem());
        dispatch(setBuscando(true));
        dispatch(findItem(id));
        MySwal.fire({
            title: 'Espere, estamos:',
            text: `Buscando cargando los datos del Postgrado`,
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

    const editPostgrado = (postgrado) => {
        var partialEdit = {};
        var cont = 0;
        var profesor = postgrado.profesor;
        postgrado.profesor = profesor.id;
        var estudiantes = [];
        postgrado.estudiantes.forEach(element => estudiantes.push(element.id));
        postgrado.estudiantes = estudiantes;
        postgrado.inicio = formatDate(postgrado.inicio);
        postgrado.fin = formatDate(postgrado.fin);
        for (const property in item) { 
            if (property !== "id") {
                partialEdit[property] = postgrado[property];
                cont++
            }
        }
        if (cont >= 1) {
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
                    <Formulario
                        dispatchSolveError={dispatchSolveError}
                        crearFunction={crearPostgrado}
                        editFunction={editPostgrado}
                        errores={errFormulario}
                        doCreate={doCreate}
                        doEdit={doEdit}
                        cancelEdit={cancelEdit}
                        doReset={doReset}
                        finishReset={finishReset}
                        item={item}
                        cantReset={cantReset}
                        profesores={lista_profesores}
                        estudiantes={lista_estudiantes}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Tabla
                        key={uuidv4()}
                        listado={lista_nacionales}
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