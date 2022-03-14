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
        categoria_docente: 'Instructor',
        categoria_cientifica: 'Ninguna',
    },
    errores: {
        read: [],
        formulario: {
            carnet_identidad: '',
            nombre: '',
            apellidos: '',
            edad: '',
            especialidad: '',
            categoria_docente: '',
            categoria_cientifica: '',
        },
        eliminar: [],
    },
    eliminados: 0,
    creando: true,
    editando: true,    
    buscando:true,
}
const profesoresITEM = 'profesores/ITEM';
const profesoresLISTADO = 'profesores/LISTADO';
const profesoresERRORES = 'profesores/ERRORES';
const profesoresELIMINADOS = 'profesores/ELIMINADOS';
const profesoresELIMINAR_ITEM = 'profesores/ELIMINAR_ITEM';
const profesoresCREANDO = 'profesores/CREANDO';
const profesoresEDITANDO = 'profesores/EDITANDO';
const profesoresBUSCANDO = 'profesores/BUSCANDO';
const profesoresADDITEM = 'profesores/ADDITEM';
const profesoresEDITLISTADO = 'profesores/EDITLISTADO';

export default function profesoresReducer(state = data, action) {
    switch (action.type) {
        case profesoresLISTADO:
            return { ...state, listado: action.payload }
        case profesoresADDITEM:
            return {...state, listado:[...state.listado, action.payload]}
        case profesoresITEM:
            return {...state, item:action.payload}
        case profesoresERRORES:
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
                        case "categoria_docente":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, categoria_docente: action.payload.errores.payload }}}
                        case "categoria_cientifica":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, categoria_cientifica: action.payload.errores.payload }}}                        
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
                            categoria_docente: '',
                            categoria_cientifica: '',
                        },
                        edit: [],
                        eliminar: [],
                    };
                    return {...state, errores};
                default:
                    return state;
            }
        case profesoresELIMINADOS:
            return { ...state, eliminados: action.payload }
        case profesoresELIMINAR_ITEM:
            const newListado = state.listado.filter(el => el.id !== action.payload);
            return { ...state, listado: newListado }
        case profesoresCREANDO:
            return { ...state, creando: action.payload }
        case profesoresEDITANDO:
            return { ...state, editando: action.payload}
        case profesoresEDITLISTADO:
            const newList = state.listado.map((item) => item.id === action.payload.id?action.payload:item);
            return {
                ...state, listado: newList, item: {
                id: null,
                carnet_identidad: '',
                nombre: '',
                apellidos: '',
                edad: '',
                especialidad: '',
                categoria_docente: 'Instructor',
                categoria_cientifica: 'Ninguna',
            }, editando:false}
        case profesoresBUSCANDO:
            return { ...state, buscando: action.payload }
        default:
            return state;
    }
}

export const getListado = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseURL}/profesores/`);
        dispatch({
            type: profesoresLISTADO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: profesoresERRORES,
            payload: { type: 'read', errores:[{action:'getListado', msg: 'No hay conexión con la base de datos'}]}
        })
    }
}
export const setErrores = (action,type,err) => (dispatch,getState) => { 
    const { errores } = getState().profesores;
    switch (action) {
        case 'eliminar':
                dispatch({
                type: profesoresERRORES,
                payload: {type,errores:err}
            });
            break;
        case 'throw':
            const previus = errores[type];
            dispatch({
                type: profesoresERRORES,
                payload: {type, errores: [...previus, err]}
            });
            break;
        case 'reset':
            dispatch({
                type: profesoresERRORES,
                payload: {type}
            });
            break;
        default:
            break;
    }
}
export const setEliminados = (value) => (dispatch) => {
    dispatch({
        type: profesoresELIMINADOS,
        payload:value
    })
}
export const setCreando = (value) => (dispatch) => {
    dispatch({
        type: profesoresCREANDO,
        payload:value
    })
}
export const setBuscando = (value) => (dispatch) => {
    dispatch({
        type: profesoresBUSCANDO,
        payload:value
    })
}
export const setEditando = (value) => (dispatch) => {
    dispatch({
        type: profesoresEDITANDO,
        payload:value
    })
}

export const doEliminar = (ids) => async (dispatch, getState) => {
    const send = async (id) => {
        await axios.delete(`${baseURL}/profesores/${id}`).then(() => {
            const eliminados = getState().profesores.eliminados;
            dispatch({
                type: profesoresELIMINADOS,
                payload: eliminados+1
            });
            dispatch({
                type:profesoresELIMINAR_ITEM,
                payload:id
            })
        }).catch(() => {
            const { eliminados, errores } = getState().profesores;
            dispatch({
                type: profesoresERRORES,
                payload:{type:'eliminar', errores:[...errores.eliminar, {action:'doEliminar', msg: 'Error eliminando al estudiante con id: '+id}]}
            });
            dispatch({
                type: profesoresELIMINADOS,
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

export const doCrear = (profesor) => async (dispatch) => {
    
    await axios.post(`${baseURL}/profesores/`, profesor)
        .then(async(response) => {
            await axios.get(`${baseURL}/profesores/${response.data.id}`).then((responseItem) => {
                dispatch({
                    type: profesoresITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: profesoresADDITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: profesoresCREANDO,
                    payload: false
                });
            })
        }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) { 
                    dispatch({
                        type: profesoresERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: profesoresERRORES,
                    payload: { type: 'read', errores:[{action:'doCreate', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: profesoresCREANDO,
                payload:false
            })
        });
}

export const findItem = (id) => async (dispatch) => {
    await axios.get(`${baseURL}/profesores/${id}`).then((responseItem) => {
        dispatch({
            type: profesoresITEM,
            payload: responseItem.data
        });
        dispatch({
            type: profesoresBUSCANDO,
            payload: false
        });
    }).catch(({ response }) => {
        if (!!response) {
            dispatch(getListado());
            dispatch({
                type: profesoresBUSCANDO,
                payload: false
            });
            dispatch({
                type: profesoresERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No se encuentra al profesor con id: ${id}` }] }
            })
        }
        else {
            dispatch({
                type: profesoresBUSCANDO,
                payload: false
            });
            dispatch({
                type: profesoresERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No hay conexion con el servidor` }] }
            })
        }
    });
}

export const doEditar = (partial) => async (dispatch, getState) => {
    let newItem = getState().profesores.item;
    await axios.patch(`${baseURL}/profesores/${newItem.id}/`, partial).then(() => {
        for (const property in partial) {
            newItem[property] = partial[property];
        }
        dispatch({
            type: profesoresEDITLISTADO,
            payload: newItem,
        })
     }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) { 
                    dispatch({
                        type: profesoresERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: profesoresERRORES,
                    payload: { type: 'read', errores:[{action:'doEdit', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: profesoresEDITANDO,
                payload:false
            })
        });
}

export const resetItem = () => async (dispatch) => { 
    dispatch({
        type: profesoresITEM,
        payload:{
            id: null,
            carnet_identidad: '',
            nombre: '',
            apellidos: '',
            edad: '',
            especialidad: '',
            categoria_docente: 'Instructor',
            categoria_cientifica: 'Ninguna',
        }
    })
}