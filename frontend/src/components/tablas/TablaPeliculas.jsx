import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import peliculaFotoDefault from '../../assets/pelicula.png'
import { Link } from 'react-router-dom'
import { EliminarPelicula, SeleccionarPelicula } from '../../actions/peliculas';


export const TablaPeliculas = ({ peliculasFiltradas }) => {
    const { peliculaSeleccionada } = useSelector(state => state.peliculas);
    const { actores } = useSelector(state => state.actores);
    const { repartos } = useSelector(state => state.repartos);
    const dispatch = useDispatch();
    const history = useHistory();

    const ManejarSeleccionarPelicula = (pelicula) => {
        dispatch(SeleccionarPelicula(pelicula));
        if (pelicula) {
            document.getElementById('btnModalPeliculas').click();
        }
    }

    const manejarEliminado = (pelicula) => {
        if (window.confirm(`¿Seguro que quiere eliminar la pelicula ${pelicula.titulo.toUpperCase()}?`)) {
            dispatch(EliminarPelicula(pelicula.id));
        }
    }

    const manejarActualizarPelicula = (pelicula) => {
        dispatch(SeleccionarPelicula(pelicula));
        history.push('/peliculas/form');
    }

    const buscarRepartos = () => {
        const listaRepartos = repartos.filter(reparto =>
        reparto.id_pelicula === peliculaSeleccionada?.id);

        return (
            listaRepartos.length > 0 ?
                <div className='ps-3'>
                    <h4>Actores</h4>
                    <ul>
                        {listaRepartos.map((reparto, idx) => (
                            <li key={idx}>
                                {actores.find(actor => actor.id === reparto.id_actor ).nombre_completo}
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <h3 className='text-center pt-3'>
                    ¡Esta pelicula no tiene actores aún!
                </h3>
        )
    }

    const peliculasFilas = peliculasFiltradas.map((pelicula, idx) => {
        return (
            <tr key={idx} className='text-center'>
                <td>
                    <img src={`${pelicula.foto_url || peliculaFotoDefault}`}
                        width='45' heigth='45' alt="actor" className='img-fluid' />
                </td>
                <td>{pelicula.titulo}</td>
                <td>{pelicula.genero}</td>
                <td>{pelicula.fecha_estreno.substring(0, 10)}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => { manejarActualizarPelicula(pelicula) }}>Actualizar</button>
                    <button className='btn btn-primary ms-4' onClick={() => { ManejarSeleccionarPelicula(pelicula) }}>Detalle</button>
                    <button className='btn btn-danger ms-4' onClick={() => { manejarEliminado(pelicula) }}>Eliminar</button>
                </td>
            </tr>

        )
    });

    return (
        <div>
            <table className="table text-white">
                <thead>
                    <tr className="text-center border-top border-warning">
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Genero</th>
                        <th>Fecha de estreno</th>
                        <th><Link to='peliculas/form' className='btn btn-success w-75 fw-bold'>Crear Pelicula</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {peliculasFilas}
                </tbody>
            </table>

            <div>
                <button id='btnModalPeliculas' type="button" className="d-none"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className="modal-title" id="exampleModalLabel">{peliculaSeleccionada?.titulo}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => { ManejarSeleccionarPelicula(null) }}></button>
                            </div>
                            <div className="modal-body bg-dark d-flex">
                                <img src={`${peliculaSeleccionada?.foto_url || peliculaFotoDefault}`}
                                    className='img-fluid' width='145' heigth='145' alt="pelicula" />

                                <div>
                                    {
                                        peliculaSeleccionada && buscarRepartos()
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger w-100"
                                    data-bs-dismiss="modal" onClick={() => { ManejarSeleccionarPelicula(null) }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
