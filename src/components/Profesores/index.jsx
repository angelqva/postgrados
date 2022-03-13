/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Grid } from '@mui/material';
//import Crear from './Crear'
import Formulario from './Formulario'
import { v4 as uuidv4 } from 'uuid';
import Tabla from '../Utils/Tabla';
import { useDispatch, useSelector } from 'react-redux';
import { getListado, setErrores, setEliminados, doEliminar} from '../../redux/profesores'
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
    const errCreate = useSelector(store => store.profesores.errores.create);
    //const errEdit = useSelector(store => store.profesores.errores.edit);
    
    const tableTitle = 'Listado de Profesores';
    //listado
    React.useEffect(() => {
        dispatch(getListado());
    }, []);
    React.useEffect(() => {
        if (errRead.length > 0) {
            var err = []
            errRead.forEach(element => err.push(element.msg));
            var str = err.join(', ');
            MySwal.fire({
                title: 'Problemas de conexón',
                text: str,
                icon: 'error',
                confirmButtonText:'Continuar'
            }).then(() => {
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
        dispatch(setErrores('eliminar', 'crear', error));
    }
    const crearProfesor = (profesor)=>{ 
        console.log(profesor);
    }
    //endCrear

    
    const sendEdit = (id) => {
            console.log(id);
        }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    {/* <Crear crearProfesor={crearProfesor} /> */}
                    <Formulario
                        dispatchSolveError={dispatchSolveError}
                        crearFunction={crearProfesor}
                        errores={errCreate}
                        doCreate={true}
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
