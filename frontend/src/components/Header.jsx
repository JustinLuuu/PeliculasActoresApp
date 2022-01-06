import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ modulo }) => {
    return (
        <header className={`text-center ${!modulo ? 'p-3' : 'p-2'} bg-danger`}>

            <h1 className='pb-1 h2'>
                ¡ PeliculasActoresApp ! <br />
            </h1>
            {
                modulo &&
                <h4 className='pt-1'><span className='bg-success rounded p-1'>Mantenimiento de {modulo}</span></h4>
            }
            {
                modulo &&
                <div className='d-flex justify-content-start'>
                    <Link to='/'>
                        <button className='border-warning border-2 bg-success text-white fw-bold'>
                            Ir a Pagina Principal
                        </button>
                    </Link>
                </div>
            }
        </header>
    )
}
