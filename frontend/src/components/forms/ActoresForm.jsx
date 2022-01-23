import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { ActualizarActor, CrearActor, SeleccionarActor } from '../../actions/actores';

const estadoInicial = { nombre_completo: '', fecha_nacimiento: '', sexo: 'H', doc_foto: null };

export const ActoresForm = () => {
    const [formValores, setFormValores] = useState(estadoInicial);
    const { actorSeleccionado } = useSelector(state => state.actores);
    const dispatch = useDispatch();
    const history = useHistory();

    const manejarEnvioForm = (e) => {
        e.preventDefault();
        !actorSeleccionado ? dispatch(CrearActor(formValores)) : dispatch(ActualizarActor(formValores));
        history.push('/actores');
    }

    const manejarCambios = ({ target }) => {
        setFormValores(
        {
            ...formValores,
            [target.name]: target.type !== 'file' ? target.value : (target.files[0] ? target.files[0] : null)
        });
    }

    useEffect(() => {
        if (actorSeleccionado) {
            setFormValores(actorSeleccionado);
        }

        return () => {
            dispatch(SeleccionarActor(null));
        }
    }, [])

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2 className='bg-primary h4 w-25 text-center p-1 rounded-pill'>
                {!actorSeleccionado ? 'Crea un Actor' : 'Actualizar Actor'}
            </h2>

            <form className='mt-3' onSubmit={manejarEnvioForm}>
                <div>
                    <label className='h5'>Nombre completo</label>
                    <input type="text" placeholder='Nombre de actor' name='nombre_completo' autoComplete='off'
                        value={formValores.nombre_completo} className='form-control' required
                        onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Fecha de nacimiento</label>
                    <input type="date" value={formValores.fecha_nacimiento.substring(0, 10)} name='fecha_nacimiento'
                        className='form-control' required onChange={manejarCambios} />
                </div>

                <div className='mt-3'>
                    <label className='h5'>Sexo</label>
                    <div className='d-flex'>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sexo"
                                value={'H'} checked={formValores.sexo === 'H'} onChange={manejarCambios} />
                            <label className="form-check-label">
                                Hombre
                            </label>
                        </div>

                        <div className="form-check ms-5">
                            <input className="form-check-input" type="radio" name="sexo"
                                value={'M'} checked={formValores.sexo === 'M'} onChange={manejarCambios} />
                            <label className="form-check-label">
                                Mujer
                            </label>
                        </div>
                    </div>
                </div>

                <div className='mt-3'>
                    <label className='h5'>
                        {(!actorSeleccionado || !actorSeleccionado.foto_url) ?
                            'Cargar foto' : 'Cargar nueva foto'}
                    </label>
                    <input type="file" name='doc_foto' className='form-control'
                        accept="image/png, image/gif, image/jpeg" onChange={manejarCambios} />
                </div>

                <button type='submit' className='btn btn-success mt-3 w-100'>
                    {!actorSeleccionado ? 'Crear' : 'Actualizar'}
                </button>
                <Link to='/actores' className='btn btn-danger mt-2 w-100'>Cancelar</Link>
            </form>
        </div>
    )
}
