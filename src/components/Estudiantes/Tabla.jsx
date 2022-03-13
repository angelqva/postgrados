/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { listado } from '../../redux/estudiantes'
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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
const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
        ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));

export default function Tabla() {
    const dispatch = useDispatch();
    const estudianteState = useSelector(store => store.estudiantes.listado);
    const [row, setRow] = React.useState([]);
    const [tableheight, setTableheight] = React.useState(163);
    const [rowSelected, setRowSelected] = React.useState([]);
    React.useEffect(() => {
        dispatch(listado());
        setRow(estudianteState);
        const id = setInterval(() => {
            dispatch(listado());
            if (estudianteState.length > row.length) {
                setRow(estudianteState);
            }
        }, 15000);
        return () => clearInterval(id)
    }, []);
    React.useEffect(() => {
        if (row.length > 1 && row.length < 9) {
            setTableheight(row.length * 52 + 115);
        }
        else if (row.length > 9) {
            setTableheight(9 * 52 + 115);
        }
        else { 
            setTableheight(163);
        }
    },[row.length]);
    
    

        
    return (
        <Box
            sx={{
                alignItems: 'center',
                '& > :not(style)': { m:'48px 8px 8px 8px' },
                width:'100%',
            }}
            >
            <Paper elevation={3} sx={{ p: 2,width: 'calc(100%-32px)' }}>
                <Typography gutterBottom={false} variant='h6' className='card-title' sx={{
                    fontSize:{ xs:'1.2em', md:'1.5em'},
                    }}>
                    { rowSelected.length>0
                        ?<div style={{ display: 'flex', flexGrow: 1 }} >
                            <div style={{ display: 'flex', flexGrow: 1 }}>Seleccionados: {rowSelected.length} </div>
                            {rowSelected.length === 1 &&
                                <div style={{ display: 'flex', flexGrow: 0, mr: 2 }}>
                                    <BootstrapTooltip title="Editar" placement='top'>
                                        <IconButton
                                            size='small'
                                            onClick={()=>console.log('edit')}
                                            color="inherit"
                                        >
                                            <AutoFixHighIcon />
                                        </IconButton>
                                    </BootstrapTooltip>
                                </div>
                            }
                            <div style={{ display: 'flex', flexGrow: 0 }}>
                                <BootstrapTooltip title="Eliminar" placement='top'>
                                    <IconButton
                                        size='small'
                                        onClick={()=>console.log('delete')}
                                        color="inherit"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </BootstrapTooltip>
                            </div>
                        </div>
                        :<div>Listado de Estudiantes</div>
                    }
                </Typography>
                <Box sx={{ alignItems: 'center', width: '100%', height:tableheight+'px'}}>
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        disableSelectionOnClick
                        onSelectionModelChange={(newSelection) => {
                            var arr = [];
                            newSelection.forEach((element) => {
                                arr.push(row[element-1])
                            })
                            setRowSelected(arr);
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
}

