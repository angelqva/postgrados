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
        edad: null,
        especialidad: '',
        categoria_docente: '',
        categoria_cientifica: '',
    },
    errores: {
        read: [],
        create: {
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
    },
    eliminados:0,
}
const ITEM = 'ITEM';
const LISTADO = 'LISTADO';
const ERRORES = 'ERRORES';
const ELIMINADOS = 'ELIMINADOS'
const ELIMINAR_ITEM = 'ELIMINAR_ITEM'

export default function profesoresReducer(state = data, action) {
    switch (action.type) {
        case LISTADO:
            return {...state, listado:action.payload}
        case ITEM:
            return {...state, item:action.payload}
        case ERRORES:
            switch (action.payload.type) {
                case 'read':
                    return { ...state, errores: { ...state.errores, read: action.payload.errores } }
                case 'create':
                    var createErrors = { ...state.errores.create };
                    for (const property in action.payload.errors) {
                        var errArr = action.payload.errors[property];
                        var str = errArr.join(', ');
                        switch (property) {
                            case "carnet_identidad":
                                createErrors = {...createErrors, carnet_identidad:str}
                                break;
                            case "nombre":
                                createErrors = {...createErrors, nombre:str}
                                break;
                            case "apellidos":
                                createErrors = {...createErrors, apellidos:str}
                                break;
                            case "edad":
                                createErrors = {...createErrors, edad:str}
                                break;
                            case "especialidad":
                                createErrors = {...createErrors, especialidad:str}
                                break;
                            case "categoria_docente":
                                createErrors = {...createErrors, categoria_docente:str}
                                break;
                            case "categoria_cientifica":
                                createErrors = {...createErrors, categoria_cientifica:str}
                                break;
                            default:
                                break;
                        }
                    }
                    return { ...state, errores: { ...state.errores, create: createErrors} }
                case 'edit':
                    return { ...state, errores: { ...state.errores, edit: action.payload.errores } }
                case 'eliminar':
                    return { ...state, errores: { ...state.errores, eliminar: action.payload.errores } }
                default:
                    return state;
            }
        case ELIMINADOS:
            return { ...state, eliminados: action.payload }
        case ELIMINAR_ITEM:
            const newListado = state.listado.filter(el => el.id !== action.payload);
            return {...state, listado:newListado}
        default:
            return state;
    }
}

export const getListado = () => async (dispatch) => {
    try {
        const res = await axios.get(`${baseURL}/profesores/`);
        dispatch({
            type: LISTADO,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: ERRORES,
            payload: { type: 'read', errores:[{action:'getListado', msg: 'No hay conexión con la base de datos'}]}
        })
    }
}
export const setErrores = (action,type,err) => (dispatch,getState) => { 
    const { errores } = getState().profesores;
    switch (action) {
        case 'eliminar':
                dispatch({
                type: ERRORES,
                payload: {type,errores:err}
            });
            break;
        case 'throw':
            const previus = errores[type];
            dispatch({
                type: ERRORES,
                payload: {type, errores: [...previus, err]}
            });
            break;
        default:
            break;
    }
}
export const setEliminados = (value) => (dispatch) => {
    dispatch({
        type: ELIMINADOS,
        payload:value
    })
}
export const doEliminar = (ids) => async (dispatch, getState) => {
    const send = async (id) => {
        await axios.delete(`${baseURL}/profesores/${id}`).then(() => {
            const eliminados = getState().profesores.eliminados;
            dispatch({
                type: ELIMINADOS,
                payload: eliminados+1
            });
            dispatch({
                type:ELIMINAR_ITEM,
                payload:id
            })
        }).catch(() => {
            const { eliminados, errores } = getState().profesores;
            dispatch({
                type: ERRORES,
                payload:{type:'eliminar', errores:[...errores.eliminar, {action:'doEliminar', msg: 'Error eliminando al estudiante con id: '+id}]}
            });
            dispatch({
                type: ELIMINADOS,
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