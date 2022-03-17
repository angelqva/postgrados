import axios from 'axios'
//constantes
const baseURL = "http://127.0.0.1:8000/api";
const data = {
    listado: [],
    item: {
        id: null,
        carnet_identidad: '',
        nombre: '',
        apellidos: '',
        edad: '',
        especialidad: '',
        sexo: 'Masculino',
        residencia: '',
        nacionalidad: '',
        graduacion:null
    },
    errores: {
        read: [],
        formulario: {
            carnet_identidad: '',
            nombre: '',
            apellidos: '',
            edad: '',
            especialidad: '',
            sexo: '',
            residencia: '',
            nacionalidad: '',
            graduacion:''
        },
        eliminar: [],
    },
    eliminados: 0,
    creando: true,
    editando: true,    
    buscando:true,
}
const estudiantesITEM = 'estudiantes/ITEM';
const estudiantesLISTADO = 'estudiantes/LISTADO';
const estudiantesERRORES = 'estudiantes/ERRORES';
const estudiantesELIMINADOS = 'estudiantes/ELIMINADOS';
const estudiantesELIMINAR_ITEM = 'estudiantes/ELIMINAR_ITEM';
const estudiantesCREANDO = 'estudiantes/CREANDO';
const estudiantesEDITANDO = 'estudiantes/EDITANDO';
const estudiantesBUSCANDO = 'estudiantes/BUSCANDO';
const estudiantesADDITEM = 'estudiantes/ADDITEM';
const estudiantesEDITLISTADO = 'estudiantes/EDITLISTADO';

export default function estudiantesReducer(state = data, action) {
    switch (action.type) {
        case estudiantesLISTADO:
            return { ...state, listado: action.payload }
        case estudiantesADDITEM:
            return {...state, listado:[...state.listado, action.payload]}
        case estudiantesITEM:
            return {...state, item:action.payload}
        case estudiantesERRORES:
            switch (action.payload.type) {
                case 'read':
                    return { ...state, errores: { ...state.errores, read: action.payload.errores } }
                case 'formulario':
                    switch (action.payload.errores.type) {
                        case "carnet_identidad":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, carnet_identidad: action.payload.errores.payload }}}
                        case "nombre":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, nombre: action.payload.errores.payload }}}
                        case "apellidos":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, apellidos: action.payload.errores.payload }}}
                        case "edad":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, edad: action.payload.errores.payload }}}
                        case "especialidad":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, especialidad: action.payload.errores.payload }}}
                        case "sexo":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, sexo: action.payload.errores.payload }}}
                        case "nacionalidad":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, nacionalidad: action.payload.errores.payload }}}
                        case "residencia":
                            return { ...state, errores: { ...state.errores, formulario: { ...state.errores.formulario, residencia: action.payload.errores.payload } } }
                        case "graduacion":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, graduacion: action.payload.errores.payload }}}
                        default:
                            return state;
                    }
                case 'eliminar':
                    return { ...state, errores: { ...state.errores, eliminar: action.payload.errores } }
                case 'reset':
                    var errores = {
                        read: [],
                        formulario: {
                            carnet_identidad: '',
                            nombre: '',
                            apellidos: '',
                            edad: '',
                            especialidad: '',
                            sexo: '',
                            residencia: '',
                            nacionalidad: '',
                            graduacion:''
                        },
                        edit: [],
                        eliminar: [],
                    };
                    return {...state, errores};
                default:
                    return state;
            }
        case estudiantesELIMINADOS:
            return { ...state, eliminados: action.payload }
        case estudiantesELIMINAR_ITEM:
            const newListado = state.listado.filter(el => el.id !== action.payload);
            return { ...state, listado: newListado }
        case estudiantesCREANDO:
            return { ...state, creando: action.payload }
        case estudiantesEDITANDO:
            return { ...state, editando: action.payload}
        case estudiantesEDITLISTADO:
            const newList = state.listado.map((item) => item.id === action.payload.id?action.payload:item);
            return {
                ...state, listado: newList, item: {
                id: null,
                carnet_identidad: '',
                nombre: '',
                apellidos: '',
                edad: '',
                especialidad: '',
                sexo: 'Masculino',
                residencia: '',
                nacionalidad: '',
                graduacion:null
            }, editando:false}
        case estudiantesBUSCANDO:
            return { ...state, buscando: action.payload }
        default:
            return state;
    }
}

export const getListado = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseURL}/estudiantes/`);
        dispatch({
            type: estudiantesLISTADO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: estudiantesERRORES,
            payload: { type: 'read', errores:[{action:'getListado', msg: 'No hay conexión con la base de datos'}]}
        })
    }
}
export const setErrores = (action,type,err) => (dispatch,getState) => { 
    const { errores } = getState().estudiantes;
    switch (action) {
        case 'eliminar':
                dispatch({
                type: estudiantesERRORES,
                payload: {type,errores:err}
            });
            break;
        case 'throw':
            const previus = errores[type];
            dispatch({
                type: estudiantesERRORES,
                payload: {type, errores: [...previus, err]}
            });
            break;
        case 'reset':
            dispatch({
                type: estudiantesERRORES,
                payload: {type}
            });
            break;
        default:
            break;
    }
}
export const setEliminados = (value) => (dispatch) => {
    dispatch({
        type: estudiantesELIMINADOS,
        payload:value
    })
}
export const setCreando = (value) => (dispatch) => {
    dispatch({
        type: estudiantesCREANDO,
        payload:value
    })
}
export const setBuscando = (value) => (dispatch) => {
    dispatch({
        type: estudiantesBUSCANDO,
        payload:value
    })
}
export const setEditando = (value) => (dispatch) => {
    dispatch({
        type: estudiantesEDITANDO,
        payload:value
    })
}

export const doEliminar = (ids) => async (dispatch, getState) => {
    const send = async (id) => {
        await axios.delete(`${baseURL}/estudiantes/${id}`).then(() => {
            const eliminados = getState().estudiantes.eliminados;
            dispatch({
                type: estudiantesELIMINADOS,
                payload: eliminados+1
            });
            dispatch({
                type:estudiantesELIMINAR_ITEM,
                payload:id
            })
        }).catch(() => {
            const { eliminados, errores } = getState().estudiantes;
            dispatch({
                type: estudiantesERRORES,
                payload:{type:'eliminar', errores:[...errores.eliminar, {action:'doEliminar', msg: 'Error eliminando al estudiante con id: '+id}]}
            });
            dispatch({
                type: estudiantesELIMINADOS,
                payload: eliminados + 1
            });
        })
    };
    try {
        ids.forEach(element => {
            send(element);
        });
    } catch (error) {
        throw (error);
    }    
}

export const doCrear = (estudiante) => async (dispatch) => {
    
    await axios.post(`${baseURL}/estudiantes/`, estudiante)
        .then(async(response) => {
            await axios.get(`${baseURL}/estudiantes/${response.data.id}`).then((responseItem) => {
                dispatch({
                    type: estudiantesITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: estudiantesADDITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: estudiantesCREANDO,
                    payload: false
                });
            })
        }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) {
                    console.log(response.data);
                    dispatch({
                        type: estudiantesERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: estudiantesERRORES,
                    payload: { type: 'read', errores:[{action:'doCreate', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: estudiantesCREANDO,
                payload:false
            })
        });
}

export const findItem = (id) => async (dispatch) => {
    await axios.get(`${baseURL}/estudiantes/${id}`).then((responseItem) => {
        dispatch({
            type: estudiantesITEM,
            payload: responseItem.data
        });
        dispatch({
            type: estudiantesBUSCANDO,
            payload: false
        });
    }).catch(({ response }) => {
        if (!!response) {
            dispatch(getListado());
            dispatch({
                type: estudiantesBUSCANDO,
                payload: false
            });
            dispatch({
                type: estudiantesERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No se encuentra al estudiante con id: ${id}` }] }
            })
        }
        else {
            dispatch({
                type: estudiantesBUSCANDO,
                payload: false
            });
            dispatch({
                type: estudiantesERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No hay conexion con el servidor` }] }
            })
        }
    });
}

export const doEditar = (partial) => async (dispatch, getState) => {
    let newItem = getState().estudiantes.item;
    await axios.patch(`${baseURL}/estudiantes/${newItem.id}/`, partial).then(() => {
        for (const property in partial) {
            newItem[property] = partial[property];
        }
        dispatch({
            type: estudiantesEDITLISTADO,
            payload: newItem,
        })
     }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) { 
                    dispatch({
                        type: estudiantesERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: estudiantesERRORES,
                    payload: { type: 'read', errores:[{action:'doEdit', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: estudiantesEDITANDO,
                payload:false
            })
        });
}

export const resetItem = () => async (dispatch) => { 
    dispatch({
        type: estudiantesITEM,
        payload:{
            id: null,
            carnet_identidad: '',
            nombre: '',
            apellidos: '',
            edad: '',
            especialidad: '',
            sexo: 'Masculino',
            residencia: '',
            nacionalidad: '',
            graduacion:null
        }
    })
}