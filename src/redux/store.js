import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import estudiantesReducer from './estudiantes'
import profesoresReducer from './profesores'
import nacionalesReducer from './nacionales'

const rootReducer = combineReducers({
    estudiantes: estudiantesReducer,
    profesores: profesoresReducer,
    nacionales: nacionalesReducer,
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store;
}