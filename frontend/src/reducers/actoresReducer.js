import { types } from "../types/types";

const initialState = {
    actores: [],
    actorSeleccionado: null,
    actoresPeticionados: false,
}

export const actoresReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.cargarActores:
            return {
                ...state,
                actores: [...action.payload],
                actoresPeticionados: true,
            }

        case types.crearActor:
            return {
                ...state,
                actores: [action.payload, ...state.actores],
            }
            
        case types.actualizarActor:
            return {
                ...state,
                actores: state.actores.map(actor=> actor.id === action.payload.id ? action.payload : actor)
            }

        case types.eliminarActor:
            return {
                ...state,
                actores: state.actores.filter(actor => actor.id !== action.payload),
            }

        case types.seleccionarActor:
            return {
                ...state,
                actorSeleccionado: action.payload,
            }

        default:
            return state
    }
}