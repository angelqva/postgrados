import axios from 'axios'
//constantes
const baseURL = "http://127.0.0.1:8000/api";
const data = {
    listado: [],
    item: {
        id: null,
        tema: '',
        codigo: '',
        cantidad_horas: '',
        impartido_universidad: true,
        inicio: null,
        fin: null,
        profesor: null,
        estudiantes:[]
    },
    errores: {
        read: [],
        formulario: {
            tema: '',
            codigo: '',
            cantidad_horas: '',
            impartido_universidad: '',
            inicio: '',
            fin: '',
            profesor: '',
            estudiantes:''
        },
        eliminar: [],
    },
    eliminados: 0,
    creando: true,
    editando: true,    
    buscando:true,
}
const nacionalesITEM = 'nacionales/ITEM';
const nacionalesLISTADO = 'nacionales/LISTADO';
const nacionalesERRORES = 'nacionales/ERRORES';
const nacionalesELIMINADOS = 'nacionales/ELIMINADOS';
const nacionalesELIMINAR_ITEM = 'nacionales/ELIMINAR_ITEM';
const nacionalesCREANDO = 'nacionales/CREANDO';
const nacionalesEDITANDO = 'nacionales/EDITANDO';
const nacionalesBUSCANDO = 'nacionales/BUSCANDO';
const nacionalesADDITEM = 'nacionales/ADDITEM';
const nacionalesEDITLISTADO = 'nacionales/EDITLISTADO';

export default function nacionalesReducer(state = data, action) {
    switch (action.type) {
        case nacionalesLISTADO:
            return { ...state, listado: action.payload }
        case nacionalesADDITEM:
            return {...state, listado:[...state.listado, action.payload]}
        case nacionalesITEM:
            return {...state, item:action.payload}
        case nacionalesERRORES:
            switch (action.payload.type) {
                case 'read':
                    return { ...state, errores: { ...state.errores, read: action.payload.errores } }
                case 'formulario':
                    switch (action.payload.errores.type) {
                        case "tema":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, tema: action.payload.errores.payload }}}
                        case "codigo":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, codigo: action.payload.errores.payload }}}
                        case "cantidad_horas":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, cantidad_horas: action.payload.errores.payload }}}
                        case "impartido_universidad":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, impartido_universidad: action.payload.errores.payload }}}
                        case "inicio":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, inicio: action.payload.errores.payload }}}
                        case "fin":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, fin: action.payload.errores.payload }}}
                        case "profesor":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, profesor: action.payload.errores.payload }}}                        
                        case "estudiantes":
                            return {...state, errores:{...state.errores,formulario:{ ...state.errores.formulario, estudiantes: action.payload.errores.payload }}}                        
                        default:
                            return state;
                    }
                case 'eliminar':
                    return { ...state, errores: { ...state.errores, eliminar: action.payload.errores } }
                case 'reset':
                    var errores = {
                        read: [],
                        formulario: {
                            tema: '',
                            codigo: '',
                            cantidad_horas: '',
                            impartido_universidad: '',
                            inicio: '',
                            fin: '',
                            profesor: '',
                            estudiantes:''
                        },
                        edit: [],
                        eliminar: [],
                    };
                    return {...state, errores};
                default:
                    return state;
            }
        case nacionalesELIMINADOS:
            return { ...state, eliminados: action.payload }
        case nacionalesELIMINAR_ITEM:
            const newListado = state.listado.filter(el => el.id !== action.payload);
            return { ...state, listado: newListado }
        case nacionalesCREANDO:
            return { ...state, creando: action.payload }
        case nacionalesEDITANDO:
            return { ...state, editando: action.payload}
        case nacionalesEDITLISTADO:
            const newList = state.listado.map((item) => item.id === action.payload.id?action.payload:item);
            return {
                ...state, listado: newList, item: {
                id: null,
                tema: '',
                codigo: '',
                cantidad_horas: '',
                impartido_universidad: true,
                inicio: null,
                fin: null,
                profesor: null,
                estudiantes:[]
            }, editando:false}
        case nacionalesBUSCANDO:
            return { ...state, buscando: action.payload }
        default:
            return state;
    }
}

export const getListado = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseURL}/nacionales/`);
        dispatch({
            type: nacionalesLISTADO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: nacionalesERRORES,
            payload: { type: 'read', errores:[{action:'getListado', msg: 'No hay conexión con la base de datos'}]}
        })
    }
}
export const setErrores = (action,type,err) => (dispatch,getState) => { 
    const { errores } = getState().nacionales;
    switch (action) {
        case 'eliminar':
                dispatch({
                type: nacionalesERRORES,
                payload: {type,errores:err}
            });
            break;
        case 'throw':
            const previus = errores[type];
            dispatch({
                type: nacionalesERRORES,
                payload: {type, errores: [...previus, err]}
            });
            break;
        case 'reset':
            dispatch({
                type: nacionalesERRORES,
                payload: {type}
            });
            break;
        default:
            break;
    }
}
export const setEliminados = (value) => (dispatch) => {
    dispatch({
        type: nacionalesELIMINADOS,
        payload:value
    })
}
export const setCreando = (value) => (dispatch) => {
    dispatch({
        type: nacionalesCREANDO,
        payload:value
    })
}
export const setBuscando = (value) => (dispatch) => {
    dispatch({
        type: nacionalesBUSCANDO,
        payload:value
    })
}
export const setEditando = (value) => (dispatch) => {
    dispatch({
        type: nacionalesEDITANDO,
        payload:value
    })
}

export const doEliminar = (ids) => async (dispatch, getState) => {
    const send = async (id) => {
        await axios.delete(`${baseURL}/nacionales/${id}`).then(() => {
            const eliminados = getState().nacionales.eliminados;
            dispatch({
                type: nacionalesELIMINADOS,
                payload: eliminados+1
            });
            dispatch({
                type:nacionalesELIMINAR_ITEM,
                payload:id
            })
        }).catch(() => {
            const { eliminados, errores } = getState().nacionales;
            dispatch({
                type: nacionalesERRORES,
                payload:{type:'eliminar', errores:[...errores.eliminar, {action:'doEliminar', msg: 'Error eliminando al Postgrado con id: '+id}]}
            });
            dispatch({
                type: nacionalesELIMINADOS,
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
    
    await axios.post(`${baseURL}/nacionales/`, profesor)
        .then(async(response) => {
            await axios.get(`${baseURL}/nacionales/${response.data.id}`).then((responseItem) => {
                dispatch({
                    type: nacionalesITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: nacionalesADDITEM,
                    payload: responseItem.data
                });
                dispatch({
                    type: nacionalesCREANDO,
                    payload: false
                });
            })
        }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) { 
                    dispatch({
                        type: nacionalesERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: nacionalesERRORES,
                    payload: { type: 'read', errores:[{action:'doCreate', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: nacionalesCREANDO,
                payload:false
            })
        });
}

export const findItem = (id) => async (dispatch) => {
    await axios.get(`${baseURL}/nacionales/${id}`).then((responseItem) => {
        dispatch({
            type: nacionalesITEM,
            payload: responseItem.data
        });
        dispatch({
            type: nacionalesBUSCANDO,
            payload: false
        });
    }).catch(({ response }) => {
        if (!!response) {
            dispatch(getListado());
            dispatch({
                type: nacionalesBUSCANDO,
                payload: false
            });
            dispatch({
                type: nacionalesERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No se encuentra al Postgrado con id: ${id}` }] }
            })
        }
        else {
            dispatch({
                type: nacionalesBUSCANDO,
                payload: false
            });
            dispatch({
                type: nacionalesERRORES,
                payload: { type: 'read', errores: [{ action: 'findItem', msg: `No hay conexion con el servidor` }] }
            })
        }
    });
}

export const doEditar = (partial) => async (dispatch, getState) => {
    let newItem = getState().nacionales.item;
    await axios.patch(`${baseURL}/nacionales/${newItem.id}/`, partial).then(() => {
        for (const property in partial) {
            newItem[property] = partial[property];
        }
        dispatch({
            type: nacionalesEDITLISTADO,
            payload: newItem,
        })
     }).catch(({ response }) => {
            if (!!response) {
                for (const property in response.data) { 
                    dispatch({
                        type: nacionalesERRORES, 
                        payload:{type:'formulario', errores:{type:property, payload:response.data[property].join(', ')}}
                    });
                }
            }
            else {
                dispatch({
                    type: nacionalesERRORES,
                    payload: { type: 'read', errores:[{action:'doEdit', msg: 'No hay conexión con la base de datos'}]}
                });
            }
            dispatch({
                type: nacionalesEDITANDO,
                payload:false
            })
        });
}

export const resetItem = () => async (dispatch) => {
    dispatch({
        type: nacionalesITEM,
        payload:{
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
    })
}