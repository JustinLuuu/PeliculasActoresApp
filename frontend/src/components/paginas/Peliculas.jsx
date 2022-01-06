import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PeliculasForm } from '../forms/PeliculasForm'
import { Header } from '../Header'
import { PeliculasPanel } from '../panels/PeliculasPanel'


export const Peliculas = () => {
    return (
        <>
            <Header modulo='Peliculas' />

            <Switch>
                <Route exact path='/peliculas' component={PeliculasPanel} />
                <Route path='/peliculas/form' component={PeliculasForm} />
            </Switch>
        </>
    )
}
