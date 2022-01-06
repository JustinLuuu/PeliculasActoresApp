import { types } from "../types/types";

const initialState = {
    peliculas: [],
    peliculaSeleccionada: null,
    peliculasPeticionadas: false,
}

export const peliculasReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.cargarPeliculas:
            return {
                ...state,
                peliculas: [...action.payload],
                peliculasPeticionadas: true,
            }

        case types.crearPelicula:
            return {
                ...state,
                peliculas: [action.payload, ...state.peliculas],
            }

        case types.actualizarPelicula:
            return {
                ...state,
                peliculas: state.peliculas.map(pelicula => pelicula.id === action.payload.id ? action.payload : pelicula)
            }


        case types.eliminarPelicula:
            return {
                ...state,
                peliculas: state.peliculas.filter(pelicula => pelicula.id !== action.payload),
            }

        case types.seleccionarPelicula:
            return {
                ...state,
                peliculaSeleccionada: action.payload
            }

        default:
            return state
    }
}