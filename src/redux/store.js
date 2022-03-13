import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import estudiantesReducer from './estudiantes'
import profesoresReducer from './profesores'
const rootReducer = combineReducers({
    estudiantes: estudiantesReducer,
    profesores:profesoresReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store;
}