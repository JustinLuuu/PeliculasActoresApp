import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ActoresForm } from '../forms/ActoresForm'
import { Header } from '../Header'
import {ActoresPanel} from '../panels/ActoresPanel'

export const Actores = () => {
    return (
        <>
            <Header modulo='Actores' />

            <Switch>
                <Route exact path='/actores' component={ActoresPanel} />                    
                <Route path='/actores/form' component={ActoresForm} />                    
            </Switch>
        </>
    )
}
