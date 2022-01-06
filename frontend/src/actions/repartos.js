import apiApp from "../api/apiApp"
import { types } from "../types/types"

export const CargarRepartos = () => {
    return async (dispatch) => {
        apiApp.get('/repartos').then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.cargarRepartos,
                    payload: resp.data
                })
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const CrearReparto = (id_actor, id_pelicula) => {
    return async (dispatch) => {      
        apiApp.post('/repartos', {id_actor, id_pelicula}).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.crearReparto,
                    payload: resp.data
                })
                alert('Reparto creado con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const EliminarReparto = (repartoId) => {
    return async (dispatch) => {
        apiApp.delete(`/repartos/${repartoId}`).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.eliminarReparto,
                    payload: repartoId
                })
                alert('Reparto eliminado con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}