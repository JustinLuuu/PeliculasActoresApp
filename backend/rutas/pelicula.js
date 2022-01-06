const express = require('express');
const dbConsultas = require('../db/consultasPelicula');

const routerPelicula = express.Router();

// GET
routerPelicula.get('/', (_, res) => {
    dbConsultas.ObtenerPeliculas().then(results => {
        results ? res.status(200).send(results[0]) : res.sendStatus(500)        
    })
});


// POST
routerPelicula.post('/', async (req, res) => {
    const body = req.body;     
    if(Object.keys(body).length === 0) 
    {
        res.status(400).send('El cuerpo enviado en la peticion no tiene un formato valido !');
    }
    
    dbConsultas.CrearPelicula(body).then(id => {
        id ? res.status(200).send({id, ...body}) : res.sendStatus(500);       
    });
});


// PUT
routerPelicula.put('/:idPelicula', async (req, res) => {
    const body = req.body;     
    if(Object.keys(body).length === 0) 
    {
        res.status(400).send('El cuerpo enviado en la peticion no tiene un formato valido !');
    }

    dbConsultas.ActualizarPelicula(body, req.params.idPelicula).then(exito => {
        exito ? res.sendStatus(200) : res.sendStatus(500);       
    });
})


// DELETE
routerPelicula.delete('/:idPelicula', async (req, res) => {
    const id = Number(req.params.idPelicula);
    if(isNaN(id)) { 
        res.status(400).send('No hay parametros en la url o el que ha enviado no es valido !');
        return;
    }
    
    dbConsultas.EliminarPelicula(id).then(exito => {
        exito ? res.sendStatus(200) : res.sendStatus(500);       
    });
})

module.exports = routerPelicula; 