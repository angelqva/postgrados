/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Box, Grid } from '@mui/material';
import Crear from './Crear'
import Tabla from '../Utils/Tabla';
import { useDispatch, useSelector } from 'react-redux';
import { listado, eliminar, clearErrores, initEliminados } from '../../redux/estudiantes'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Estudiantes() {
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
            width: 110,
        },
        {
            field: 'edad',
            headerName: 'Edad',
            type: 'number',
            width: 60,
        },
        {
            field: 'sexo',
            headerName: 'Sexo',    
            width: 90,
        },
        {
            field: 'especialidad',
            headerName: 'Especialidad',        
            width: 100,
        },
        {
            field: 'nacionalidad',
            headerName: 'Nacionalidad',
            width:100,
        },
        {
            field: 'residencia',
            headerName: 'Residencia',        
            width: 100,
        },
        {
            field: 'graduacion',
            headerName: 'Graduación',       
            width: 100,
        }
        
    ];
    const dispatch = useDispatch();
    const estudianteState = useSelector(store => store.estudiantes.listado);    
    const eliminados = useSelector(store => store.estudiantes.eliminados);
    const errores = useSelector(store => store.estudiantes.errores);
    const [showDelete, setShowDelete] = React.useState(false);
    const [totalDelete, setTotalDelete] = React.useState(null);
    const fulldelete = React.useMemo(() => {
        if (totalDelete === eliminados) {
            return true;
        }
        return false;
    }, [totalDelete, eliminados]);
    const erroresStr = React.useMemo(() => {
        if (errores.length === 0) {
            return '';
        }
        else { 
            const err = errores.filter((element) => {
                if (typeof element.type !== undefined) {
                    if (element.type === 'ELIMINANDOLOS') {
                        return true;
                    }
                }
                return false;
            })
            var errstr = [];
            err.forEach(element => errstr.push(element.msg));
            const str = errstr.join(", ");
            return str;
        }
        
    }, [errores]);
    React.useEffect((
        () => {
            dispatch(listado());            
        }
    ), []);
    React.useEffect(() => {        
        if (showDelete && !fulldelete) { 
            MySwal.fire({
                title: 'PorFavor Espere',
                html: 'Eliminando Esutidiantes',
                allowOutsideClick: false,
                didOpen: () => {
                    MySwal.showLoading()
                }
            });
        }
        if (showDelete && fulldelete) {
            MySwal.close();
            if (erroresStr.length > 0) {
                MySwal.fire({
                    title: 'Acción con error',
                    text: erroresStr,
                    icon: 'error',
                    didOpen: () => {
                        Swal.hideLoading()
                    },
                    confirmButtonText:'Continuar'
                });
            } else { 
                MySwal.fire(
                    'Eliminados Correctamente',
                    'Los Estudiantes han sido eliminados',
                    'success'
                );
            }
            
            setShowDelete(false);
        }
    },[showDelete, fulldelete, erroresStr]);
    
    const sendEdit = (id) => {
        console.log(id);
    }
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
                dispatch(clearErrores());
                dispatch(initEliminados());
                setShowDelete(true);
                setTotalDelete(ids.length);
                dispatch(eliminar(ids));
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
    const tableTitle = 'Listado de Estudiantes';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Crear />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Tabla
                        listado={estudianteState}
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
