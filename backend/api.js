const express = require('express');
const cors = require('cors');
const xmlParser = require('xml-bodyparser');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(xmlParser());


const rutaActor = require('./rutas/actor');
const rutaPelicula = require('./rutas/pelicula');
const rutaReparto = require('./rutas/reparto');


app.use('/actores', rutaActor);
app.use('/peliculas', rutaPelicula);
app.use('/repartos', rutaReparto);


const PORT = 7000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));