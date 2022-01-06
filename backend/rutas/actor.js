const express = require('express');
const dbConsultas = require('../db/consultasActor');

const routerActor = express.Router();

// GET
routerActor.get('/', (_, res) => {
    dbConsultas.ObtenerActores().then(results => {
        results ? res.status(200).send(results[0]) : res.sendStatus(500)        
    })
});


// POST
routerActor.post('/', async (req, res) => {
    const body = req.body;     
    if(Object.keys(body).length === 0) 
    {
        res.status(400).send('El cuerpo enviado en la peticion no tiene un formato valido !');
    }
    
    dbConsultas.CrearActor(body).then(id => {
        id ? res.status(200).send({id, ...body}) : res.sendStatus(500);       
    });
});


// PUT
routerActor.put('/:idActor', async (req, res) => {
    const body = req.body;     
    if(Object.keys(body).length === 0) 
    {
        res.status(400).send('El cuerpo enviado en la peticion no tiene un formato valido !');
    }

    dbConsultas.ActualizarActor(body, req.params.idActor).then(exito => {
        exito ? res.sendStatus(200) : res.sendStatus(500);       
    });
})


//DELETE
routerActor.delete('/:idActor', async (req, res) => {
    const id = Number(req.params.idActor);
    if(isNaN(id)) { 
        res.status(400).send('No hay parametros en la url o el que ha enviado no es valido !');
        return;
    }
    
    dbConsultas.EliminarActor(id).then(exito => {
        exito ? res.sendStatus(200) : res.sendStatus(500);       
    });
});

module.exports = routerActor; 
