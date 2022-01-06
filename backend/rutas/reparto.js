const express = require('express');
const dbConsultas = require('../db/consultasReparto');

const routerReparto = express.Router();

// GET
routerReparto.get('/', (_, res) => {
    dbConsultas.ObtenerRepartos().then(results => {
        results ? res.status(200).send(results[0]) : res.sendStatus(500)        
    })
});


// POST
routerReparto.post('/', async (req, res) => {
    const body = req.body;      
    if(Object.keys(body).length === 0) 
    {
        res.status(400).send('El cuerpo enviado en la peticion no tiene un formato valido !');
    }

    dbConsultas.CrearReparto(body).then(nuevoReparto => {
        nuevoReparto ? 
        res.status(200).send(nuevoReparto) :
        res.sendStatus(500);       
    });
});


//DELETE
routerReparto.delete('/:idReparto', async (req, res) => {
    const id = Number(req.params.idReparto);
    if(isNaN(id)) { 
        res.status(400).send('No hay parametros en la url o el que ha enviado no es valido !');
        return;
    }
    
    dbConsultas.EliminarReparto(id).then(exito => {
        exito ? res.sendStatus(200) : res.sendStatus(500);       
    });
})

module.exports = routerReparto; 