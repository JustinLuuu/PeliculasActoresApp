import { types } from "../types/types";

const initialState = {
    repartos: [],
    repartosPeticionados: false,
}


export const repartosReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.cargarRepartos:
            return {
                ...state,
                repartos: [...action.payload],
                repartosPeticionados: true,
            }

        case types.crearReparto:
            return {
                ...state,
                repartos: [...state.repartos, action.payload],
            }

            case types.eliminarReparto:
                return {
                    ...state,
                    repartos: state.repartos.filter(reparto => reparto.id !== action.payload),
                }

        default:
            return state
    }
}