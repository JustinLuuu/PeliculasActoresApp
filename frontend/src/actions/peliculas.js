import apiApp from "../api/apiApp"
import { subirImagen } from "../helpers/subirImagen"
import { types } from "../types/types"

export const CargarPeliculas = () => {
    return async (dispatch) => {
        apiApp.get('/peliculas').then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.cargarPeliculas,
                    payload: resp.data
                })
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const CrearPelicula = (pelicula) => {
    return async (dispatch) => {
        if (pelicula.doc_foto) {
            const urlClodinary = await subirImagen(pelicula.doc_foto);
            pelicula.foto_url = urlClodinary;
        }

        apiApp.post('/peliculas', pelicula).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.crearPelicula,
                    payload: resp.data
                });
                alert('Pelicula creada con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const ActualizarPelicula = (peliculaActualizada) => {
    return async (dispatch) => {

        if (peliculaActualizada.doc_foto) {
            const urlClodinary = await subirImagen(peliculaActualizada.doc_foto);
            peliculaActualizada.foto_url = urlClodinary;
        }

        apiApp.put(`/peliculas/${peliculaActualizada.id}`, peliculaActualizada).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.actualizarPelicula,
                    payload: peliculaActualizada
                });
                alert('Pelicula Actualizada con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}

export const EliminarPelicula = (peliculaId) => {
    return async (dispatch) => {
        apiApp.delete(`/peliculas/${peliculaId}`).then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: types.eliminarPelicula,
                    payload: peliculaId
                });
                dispatch({
                    type: types.eliminarRepartosPelicula,
                    payload: peliculaId
                });
                alert('pelicula eliminada con exito');
            } else {
                alert('hubo un error, codigo estatus http:', resp.status);
            }
        })
    }
}


export const SeleccionarPelicula = (pelicula) => {
    return (dispatch) => {
        dispatch({
            type: types.seleccionarPelicula,
            payload: pelicula
        })
    }
}
