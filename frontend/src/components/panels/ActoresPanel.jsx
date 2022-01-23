import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TablaActores } from '../tablas/TablaActores'

export const ActoresPanel = () => {

    const { actores: actoresColeccion } = useSelector((state) => state.actores);
    const [actoresFiltrados, setActoresFiltrados] = useState(actoresColeccion);
    const [filtroValores, setFiltroValores] = useState({ sexo: '', general: '' })

    useEffect(() => {
        filtrarActores();
    }, [actoresColeccion, filtroValores]);

    const filtrarActores = () => {
        const { sexo, general } = filtroValores;
        if (actoresColeccion) {
            let actoresFiltrar = actoresColeccion;

            if (sexo) {
                actoresFiltrar = actoresFiltrar.filter((actor) => actor.sexo === sexo);
            }

            if(general){
                actoresFiltrar = actoresFiltrar.
                filter((actor) => 
                actor.nombre_completo.toUpperCase().includes(general.toUpperCase()) ||
                actor.sexo.includes(general[0].toUpperCase()));
            }

            setActoresFiltrados(actoresFiltrar);
        }
    }

    const manejarBusquedaSexo = ({target}) => {
        const valor = target.value;
        if(valor=== 'H' || valor === 'M'){
            setFiltroValores({...filtroValores, sexo: valor });
        } else {
            setFiltroValores({...filtroValores, sexo: '' });
        }
    }

    const manejarBusquedaGeneral = ({target}) => {
        setFiltroValores({...filtroValores, general: target.value});
    }

    const limpiarValoresBusqueda = () => {
        setFiltroValores({sexo: '', general: ''});
    }

    return (
        <div className='px-5'>

            <div className='py-5 fw-bold row'>
                <div className='mx-5 col-3'>
                    <span>Filtrar por sexo</span>
                    <select value={filtroValores.sexo} className="form-select mt-2" onChange={manejarBusquedaSexo}>
                        <option defaultValue="Filtrar por sexo">Filtrar..</option>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                    </select>
                </div>

                <div className='mx-5 col-3'>
                    <span>Busqueda general</span>
                    <input type="text" value={filtroValores.general} placeholder='Escribir aqui'
                     className='form-control mt-2' onChange={manejarBusquedaGeneral} />
                </div>

                <div className='col-4 d-flex align-items-center justify-content-between pt-4'>
                    <button className='btn btn-primary w-50' onClick={limpiarValoresBusqueda}>Limpiar filtros</button>
                </div>
            </div>

            <TablaActores actoresFiltrados={actoresFiltrados} />
        </div>
    )
}
