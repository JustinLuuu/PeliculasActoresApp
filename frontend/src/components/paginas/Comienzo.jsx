import React, { useEffect } from 'react'
import pelicula from '../../assets/pelicula.png'
import actor from '../../assets/actor.png'
import {Header} from '../Header';
import { Link } from 'react-router-dom'

export const Comienzo = () => {
    return (
        <>
            <Header />

            <section className='w-100 row d-flex align-items-center justify-content-center text-center mt-5 pt-5'>
                <Link to="/peliculas" className='col-5 h-50 border border-warning pt-3 m-3'>
                    <img src={pelicula} width='250' height='230' alt='pelicula' className='img-fluid' />
                    <h3 className='mt-3'>Mantenimiento de Películas</h3>
                </Link>

                <Link to="/actores" className='col-5 h-50 border border-warning pt-3 m-3'>
                    <img src={actor} width='250' height='230' alt='actor' className='img-fluid' />
                    <h3 className='mt-3'>Mantenimiento de Actores</h3>
                </Link>
            </section>
        </>
    )
}