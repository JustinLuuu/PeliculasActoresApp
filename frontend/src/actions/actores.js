import apiApp from "../api/apiApp"
import { subirImagen } from "../helpers/subirImagen"
import { types } from "../types/types"

export const CargarActores = () => {
    return async (dispatch) => {
        apiApp.get('/actores').then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.cargarActores,
                    payload: resp.data
                })
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const CrearActor = (actor) => {
    return async (dispatch) => {
        if (actor.doc_foto) {
            const urlClodinary = await subirImagen(actor.doc_foto);
            actor.foto_url = urlClodinary;
        }

        apiApp.post('/actores', actor).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.crearActor,
                    payload: resp.data
                });
                alert('Actor creado con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const ActualizarActor = (actorActualizado) => {
    return async (dispatch) => {

        if (actorActualizado.doc_foto) {
            const urlClodinary = await subirImagen(actorActualizado.doc_foto);
            actorActualizado.foto_url = urlClodinary;
        }

        apiApp.put(`/actores/${actorActualizado.id}`, actorActualizado).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.actualizarActor,
                    payload: actorActualizado
                });
                alert('Actor Actualizado con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const EliminarActor = (actorId) => {
    return async (dispatch) => {
        apiApp.delete(`/actores/${actorId}`).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.eliminarActor,
                    payload: actorId
                })
                alert('actor eliminado con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}


export const SeleccionarActor = (actor) => {
    return (dispatch) => {
        dispatch({
            type: types.seleccionarActor,
            payload: actor
        })
    }
}
