
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
        nacionalidad: '',
        residencia: '',
        graduacion:'',
        sexo:''
    },
    errores:[],
    listando: false,
    buscando: false,
    encontrado: false,
    creando: false,
    creado: false,
    editando: false,
    editado: false,
    eliminados:0,
    eliminandolos: false,
}
const LISTANDO = 'LISTANDO'
const ITEM = 'ITEM';
const LISTADO = 'LISTADO';
const BUSCANDO = 'BUSCANDO';
const ENCONTRADO = 'ENCONTRADO';
const ERRORES = 'ERRORES';
const CREANDO = 'CREANDO';
const CREADO = 'CREADO';
const EDITANDO = 'EDITANDO';
const EDITADO = 'EDITADO';
const ELIMINANDOLOS = 'ELIMINANDOLOS';
const ELIMINADOS = 'ELIMINADOS'

//reducer
export default function estudiantesReducer(state = data, action) {
    switch (action.type) {
        case LISTADO:
            return {...state, listado:action.payload}
        case ITEM:
            return {...state, item:action.payload}
        case ERRORES:
            return {...state, errores:action.payload}
        case LISTANDO:
            return {...state, listando:action.payload}
        case BUSCANDO:
            return {...state, buscando:action.payload}
        case ENCONTRADO:
            return {...state, encontrado:action.payload}
        case CREANDO:
            return {...state, creando:action.payload}
        case CREADO:
            return {...state, creado:action.payload}
        case EDITANDO:
            return {...state, editando:action.payload}
        case EDITADO:
            return { ...state, editado: action.payload }
        case ELIMINADOS:
            return { ...state, eliminados: action.payload}
        default:
            return state;
    }
}

export const initEliminados = () => async (dispatch) => {
    dispatch({
        type: ELIMINADOS,
        payload: 0
    });
}
export const listado = () => async (dispatch) => {
    dispatch({
        type: LISTANDO,
        payload: true
    });
    try {
        const res = await axios.get(`${baseURL}/estudiantes/`);
        dispatch({
            type: LISTADO,
            payload: res.data
        });

    } catch (error) {
        console.log(error)
    }
    dispatch({
        type: LISTANDO,
        payload: false
    });
}
export const eliminar = (ids) => async (dispatch, getState) => {
    const loadListado = async () => {
        const res = await axios.get(`${baseURL}/estudiantes/`);
        dispatch({
            type: LISTADO,
            payload: res.data
        });
    }
    const send = async (id) => {
        await axios.delete(`${baseURL}/estudiantes/${id}`).then(
            () => {
                loadListado();
                const eliminados = getState().estudiantes.eliminados;
                dispatch({
                    type: ELIMINADOS,
                    payload: eliminados+1
                });
            }).catch(
                () => {
                    const { eliminados, errores } = getState().estudiantes;
                    dispatch({
                        type: ERRORES,
                        payload: [...errores,{type:ELIMINANDOLOS, msg: 'Error eliminando al estudiante con id: '+id}]
                    });
                    dispatch({
                        type: ELIMINADOS,
                        payload: eliminados + 1
                    });
                    loadListado();
                }
            )
    };
    try {
        ids.forEach(element => {
            send(element);
        });
    } catch (error) {
        dispatch({
            type: ERRORES,
            payload: [{type:ELIMINANDOLOS, msg: 'Se Encontraron errores a la hora de eliminar los estudiantes seleccionados', error:error}]
        });
    }    
}
export const clearErrores = () => async (dispatch) => { 
    dispatch({
        type: ERRORES,
        payload: []
    });
}
export const item = (id) => async(dispatch) => {    
    dispatch({
        type: BUSCANDO,
        payload: true
    });
    try {
        const res = await axios.get(`${baseURL}/estudiantes/${id}`);
        dispatch({
            type: ITEM,
            payload: res.data
        });
        dispatch({
            type: ENCONTRADO,
            payload: true
        });
    } catch (error) {
        dispatch({
            type: ENCONTRADO,
            payload: false
        });
    }
    dispatch({
        type: BUSCANDO,
        payload: false
    });
}
