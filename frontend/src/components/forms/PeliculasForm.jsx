import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ActualizarPelicula, CrearPelicula, SeleccionarPelicula } from '../../actions/peliculas';

const estadoInicial = { titulo: '', fecha_estreno: '', genero: '', doc_foto: null };

export const PeliculasForm = () => {
    const [formValores, setFormValores] = useState(estadoInicial);
    const { peliculaSeleccionada, peliculas } = useSelector(state => state.peliculas);
    const dispatch = useDispatch();
    const history = useHistory();

    const tituloRepetido = () => {
        const formTitulo = formValores.titulo;
        return formTitulo !== peliculaSeleccionada?.titulo ? 
        peliculas.some(pelicula => pelicula.titulo.trim().toUpperCase() === formTitulo.trim().toUpperCase()) : false;
    }

    const manejarEnvioForm = (e) => {
        e.preventDefault();

        if (!tituloRepetido()) {
            !peliculaSeleccionada ? dispatch(CrearPelicula(formValores)) : dispatch(ActualizarPelicula(formValores));
            history.push('/peliculas');
        } else{
            alert('YA EXISTE UNA PELICULA CON EL MISMO TITULO');
        }
    }

    const manejarCambios = ({ target }) => {
        setFormValores(
        {
            ...formValores,
            [target.name]: target.type !== 'file' ? target.value : (target.files[0] ? target.files[0] : null)
        });
    }

    useEffect(() => {
        if (peliculaSeleccionada) {
            setFormValores(peliculaSeleccionada);
        }

        return () => {
            dispatch(SeleccionarPelicula(null));
        }
    }, [])

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2 className='bg-primary h4 w-25 text-center p-1 rounded-pill'>
                {!peliculaSeleccionada ? 'Crea una Pelicula' : 'Actualizar Pelicula'}
            </h2>

            <form className='mt-3' onSubmit={manejarEnvioForm}>
                <div>
                    <label className='h5'>Titulo</label>
                    <input type="text" placeholder='Titulo de pelicula' name='titulo' autoComplete='off'
                        value={formValores.titulo} className='form-control' required
                        onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Genero</label>
                    <input type="text" placeholder='Genero' name='genero' autoComplete='off'
                        value={formValores.genero} className='form-control' required
                        className='form-control' required onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Fecha de estreno</label>
                    <input type="date" value={formValores.fecha_estreno.substring(0, 10)} name='fecha_estreno'
                        className='form-control' required onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>
                        {(!peliculaSeleccionada || !peliculaSeleccionada.foto_url) ?
                            'Cargar portada' : 'Cargar nueva portada'}
                    </label>
                    <input type="file" name='doc_foto' className='form-control'
                        accept="image/png, image/gif, image/jpeg" onChange={manejarCambios} />
                </div>

                <button type='submit' className='btn btn-success mt-3 w-100'>
                    {!peliculaSeleccionada ? 'Crear' : 'Actualizar'}
                </button>
                <Link to='/peliculas' className='btn btn-danger mt-2 w-100'>Cancelar</Link>
            </form>
        </div>
    )
}
