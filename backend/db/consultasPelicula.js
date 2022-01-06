const config = require('./dbConfig');
const sql = require('mssql');

const ObtenerPeliculas = async() => {
    try {
        const conexion = await sql.connect(config);
        const results = await conexion.request().query(`
            Select id, titulo, genero, fecha_estreno, foto_url From Pelicula
            order by genero
        `);
        
        return results.recordsets;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const CrearPelicula = async(pelicula) => {
    try {        
        const conexion = await sql.connect(config);
        conexion.request().query(`
            Insert into Pelicula
            values('${pelicula.titulo}', '${pelicula.genero}', '${pelicula.fecha_estreno}', 
            ${pelicula.foto_url ? `'${pelicula.foto_url}'` : null})  
        `);

        const idPeliculaCreada = await conexion.request().query(`
         SELECT IDENT_CURRENT('Pelicula') as id
        `)

        return idPeliculaCreada.recordset[0].id;
    }
    catch (error) {
        console.log(error); 
        return null;
    }
}

const ActualizarPelicula = async(pelicula, idPelicula) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`
            Update Pelicula Set
            Titulo='${pelicula.titulo}', Genero='${pelicula.genero}', Fecha_estreno='${pelicula.fecha_estreno}',
            Foto_url=${pelicula.foto_url ? `'${pelicula.foto_url}'` : null} Where Id= ${idPelicula}
        `);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const EliminarPelicula = async(idPelicula) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`Delete from Pelicula Where Id= ${idPelicula}`);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    ObtenerPeliculas, CrearPelicula, ActualizarPelicula, EliminarPelicula
}; 
