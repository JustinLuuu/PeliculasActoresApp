import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { peliculasReducer } from "../reducers/peliculasReducer";
import { actoresReducer } from "../reducers/actoresReducer";
import { repartosReducer } from "../reducers/repartosReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    peliculas: peliculasReducer,
    actores: actoresReducer,
    repartos: repartosReducer
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)) );