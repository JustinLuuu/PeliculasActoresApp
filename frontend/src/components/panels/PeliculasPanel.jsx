import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TablaPeliculas } from '../tablas/TablaPeliculas'


export const PeliculasPanel = () => {

    const { peliculas: peliculasColeccion } = useSelector((state) => state.peliculas);
    const [peliculasFiltradas, setPeliculasFiltradas] = useState(peliculasColeccion);
    const [filtroValores, setFiltroValores] = useState({ genero: '', general: '' });

    useEffect(() => {
        filtrarPeliculas();
    }, [peliculasColeccion, filtroValores]);


    const obtenerGenerosSelect = () => {
        const generos = peliculasColeccion.map(pelicula => pelicula.genero);
        const generosNoRepetidos= [...new Set(generos)];
        return (
            generosNoRepetidos.map((genero, idx) => (
                <option key={idx} value={genero}>{genero}</option>
            ))
        )
    }
    
    const filtrarPeliculas = () => {
        const { genero, general } = filtroValores;
        if (peliculasColeccion) {
            let peliculasFiltrar = peliculasColeccion;

            if (genero) {
                peliculasFiltrar = peliculasFiltrar.filter((pelicula) => pelicula.genero === genero);
            }

            if(general){
                peliculasFiltrar = peliculasFiltrar.
                filter((pelicula) => 
                pelicula.titulo.toUpperCase().includes(general.toUpperCase()) || 
                pelicula.genero === genero)
            }

            setPeliculasFiltradas(peliculasFiltrar);
        }
    }

    const manejarBusquedaGenero = ({target}) => {
        setFiltroValores({...filtroValores, genero: target.value});
    }

    const manejarBusquedaGeneral = ({target}) => {
        setFiltroValores({...filtroValores, general: target.value});
    }

    const limpiarValoresBusquedas = () => {
        setFiltroValores({genero: '', general: ''});
    }

    return (
        <div className='px-5'>
            <div className='py-5 fw-bold row'>
                <div className='mx-5 col-3'>
                    <span>Filtrar por genero</span>
                    <select value={filtroValores.genero} className="form-select mt-2" onChange={manejarBusquedaGenero}>
                        <option defaultValue="Filtrar por genero">Filtrar..</option>
                        {
                            obtenerGenerosSelect()
                        }
                    </select>
                </div>

                <div className='mx-5 col-3'>
                    <span>Busqueda general</span>
                    <input type="text" value={filtroValores.general} placeholder='Escribir aqui'
                     className='form-control mt-2' onChange={manejarBusquedaGeneral} />
                </div>

                <div className='col-4 d-flex align-items-center justify-content-between pt-4'>
                    <button className='btn btn-primary w-50' onClick={limpiarValoresBusquedas}>Limpiar filtros</button>
                </div>
            </div>

            <TablaPeliculas peliculasFiltradas={peliculasFiltradas} />
        </div>
    )
}
