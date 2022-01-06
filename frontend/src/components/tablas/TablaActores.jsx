import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { EliminarActor, SeleccionarActor } from '../../actions/actores'
import { CrearReparto, EliminarReparto } from '../../actions/repartos'
import actorFotoDefault from '../../assets/actor.png'


export const TablaActores = ({ actoresFiltrados }) => {
    const { actorSeleccionado } = useSelector(state => state.actores);
    const { peliculas } = useSelector(state => state.peliculas);
    const { repartos } = useSelector(state => state.repartos);
    const dispatch = useDispatch();
    const history = useHistory();

    const manejarEliminado = (actor) => {
        if (window.confirm(`¿Seguro que quiere eliminar al actor ${actor.nombre_completo.toUpperCase()}?`)) {
            dispatch(EliminarActor(actor.id));
        }
    }

    const ManejarSeleccionarActor = (actor) => {
        dispatch(SeleccionarActor(actor));
        if (actor) {
            document.getElementById('btnModalActores').click();
        }
    }
    
    const manejarRepartir = (actor) => {
        dispatch(SeleccionarActor(actor));
        document.getElementById('btnModalRepartir').click();
    }

    const manejarActualizarActor = (actor) => {
        dispatch(SeleccionarActor(actor));
        history.push('/actores/form');
    }

    const manejarVinculoPelicula = (peliculaId, participando) => {
        if(!participando){
            dispatch(CrearReparto(actorSeleccionado.id, peliculaId));
        } else{
            const repartoParticipandoId = repartos.find(
            reparto => reparto.id_actor === actorSeleccionado.id && reparto.id_pelicula === peliculaId).id;

            dispatch(EliminarReparto(repartoParticipandoId));
        }
    }

    const obtenerPeliculas = () => {
        const participandoEnPelicula = (idPelicula) => {
           return repartos.some(
            reparto => reparto.id_actor === actorSeleccionado.id && reparto.id_pelicula === idPelicula)
        }

        return (
            peliculas.length > 0 ?
                <div className='ps-1'>
                    <ul>
                        {peliculas.map((pelicula, idx) => (
                            <li key={idx} className='border-bottom p-1 d-flex justify-content-between'>
                                <span>{(idx + 1)}- {pelicula.titulo}</span>
                                <input type="checkbox"
                                 className='form-check-input ms-5' 
                                 checked={participandoEnPelicula(pelicula.id)}
                                 onChange={()=> {}}
                                 onClick={()=> {manejarVinculoPelicula(pelicula.id, participandoEnPelicula(pelicula.id))}}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <h3 className='text-center pt-3'>
                    ¡Aun no hay peliculas!
                </h3>
        )
    }

    const buscarRepartosActor = () => {
        const listaRepartos = repartos.filter(reparto =>
            reparto.id_actor === actorSeleccionado?.id);

        return (
            listaRepartos.length > 0 ?
                <div className='ps-3'>
                    <h4>Peliculas Repartidas</h4>
                    <ul>
                        {listaRepartos.map((reparto, idx) => (
                            <li key={idx}>
                                {peliculas.find(pelicula => pelicula.id === reparto.id_pelicula ).titulo}
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <h3 className='text-center pt-3'>
                    ¡Este actor no tiene un reparto aún!
                </h3>
        )
    }

    const actoresFilas = actoresFiltrados.map((actor, idx) => {
        return (
            <tr key={idx} className='text-center'>
                <td>
                    <button className='btn btn-secondary fw-bold' onClick={() => { manejarRepartir(actor) }}>
                        Repartir
                    </button>
                </td>
                <td>
                    <img src={`${actor.foto_url || actorFotoDefault}`} width='45' heigth='45' alt="actor" className='img-fluid' />
                </td>
                <td>{actor.nombre_completo}</td>
                <td>{actor.sexo === 'H' ? 'Hombre' : 'Mujer'}</td>
                <td>{actor.fecha_nacimiento.substring(0, 10)}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => { manejarActualizarActor(actor) }}>Actualizar</button>
                    <button className='btn btn-primary ms-4' onClick={() => { ManejarSeleccionarActor(actor) }}>Detalle</button>
                    <button className='btn btn-danger ms-4' onClick={() => { manejarEliminado(actor) }}>Eliminar</button>
                </td>
            </tr>

        )
    });


    return (
        <div>
            <table className="table text-white">
                <thead>
                    <tr className="text-center border-top border-warning">
                        <th></th>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Sexo</th>
                        <th>Fecha de nacimiento</th>
                        <th><Link to='actores/form' className='btn btn-success w-75 fw-bold'>Crear Actor</Link></th>
                    </tr>
                </thead>
                <tbody>
                    {actoresFilas}
                </tbody>
            </table>
        

            <div>
                <button id='btnModalActores' type="button" className="d-none"
                    data-bs-toggle="modal" data-bs-target="#modalReparto">
                </button>

                <div className="modal fade" id="modalReparto" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className="modal-title" id="exampleModalLabel">{actorSeleccionado?.nombre_completo}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => { ManejarSeleccionarActor(null) }}></button>
                            </div>
                            <div className="modal-body bg-dark d-flex">
                                <img src={`${actorSeleccionado?.foto_url || actorFotoDefault}`}
                                    className='img-fluid' width='145' heigth='145' alt="actor" />

                                <div>
                                    {
                                        actorSeleccionado && buscarRepartosActor()
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger w-100"
                                    data-bs-dismiss="modal" onClick={() => { ManejarSeleccionarActor(null) }}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <button id='btnModalRepartir' type="button" className="d-none"
                    data-bs-toggle="modal" data-bs-target="#modalRepartir">
                </button>

                <div className="modal fade" id="modalRepartir" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header border-bottom-0 pb-0">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Añadir participacion a {actorSeleccionado?.nombre_completo} en :
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => { ManejarSeleccionarActor(null) }}></button>
                            </div>
                            <div className="modal-body bg-dark d-flex">
                                <img src={`${actorSeleccionado?.foto_url || actorFotoDefault}`}
                                    className='img-fluid' width='145' heigth='130' alt="actor" />

                                <div>
                                    {
                                        actorSeleccionado && obtenerPeliculas()
                                    }
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success w-100"
                                    data-bs-dismiss="modal" onClick={() => { ManejarSeleccionarActor(null) }}>Listo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
