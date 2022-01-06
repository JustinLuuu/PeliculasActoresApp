import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { ActualizarPelicula, CrearPelicula, SeleccionarPelicula } from '../../actions/peliculas';

const estadoInicial = { titulo: '', fecha_estreno: '', genero: '', doc_foto: null };

export const PeliculasForm = () => {
    const [formValues, setFormValues] = useState(estadoInicial);
    const { peliculaSeleccionada, peliculas } = useSelector(state => state.peliculas);
    const dispatch = useDispatch();
    const history = useHistory();


    const manejarEnvioForm = (e) => {
        e.preventDefault();
        const peliculaRepetida = peliculas.some(pelicula =>
        pelicula.titulo.toUpperCase() === formValues.titulo.toUpperCase())

        if (!peliculaRepetida) {
            !peliculaSeleccionada ? dispatch(CrearPelicula(formValues)) : dispatch(ActualizarPelicula(formValues));
            history.push('/peliculas');
        } else{
            alert('YA EXISTE UNA PELICULA CON EL MISMO TITULO');
        }
    }

    const manejarCambios = ({ target }) => {
        setFormValues(
            {
                ...formValues,
                [target.name]: target.type !== 'file' ? target.value : (target.files[0] ? target.files[0] : null)
            });
    }

    useEffect(() => {
        if (peliculaSeleccionada) {
            setFormValues(peliculaSeleccionada);
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
                        value={formValues.titulo} className='form-control' required
                        onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Genero</label>
                    <input type="text" placeholder='Genero' name='genero' autoComplete='off'
                        value={formValues.genero} className='form-control' required
                        className='form-control' required onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Fecha de estreno</label>
                    <input type="date" value={formValues.fecha_estreno.substring(0, 10)} name='fecha_estreno'
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
