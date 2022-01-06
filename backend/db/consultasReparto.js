const config = require('./dbConfig');
const sql = require('mssql');

const ObtenerRepartos = async () => {
    try {
        const conexion = await sql.connect(config);
        const results = await conexion.request().query(`
            select rep.id, ac.id as id_actor, ac.nombre_completo as nombre_actor, 
            pe.id as id_pelicula, pe.Titulo as titulo_pelicula
            from Reparto rep 
            join Actor ac ON (rep.Actor_id = ac.Id) 
            join Pelicula pe ON (rep.Pelicula_id = pe.Id)
        `);
        return results.recordsets;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const CrearReparto = async (reparto) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`
            Insert into Reparto values('${reparto.id_actor}', '${reparto.id_pelicula}')
        `);

        const idRepartoCreado = await conexion.request().query(`
            select rep.id, ac.id as id_actor, ac.nombre_completo as nombre_actor, 
            pe.id as id_pelicula, pe.Titulo as titulo_pelicula
            from Reparto rep 
            join Actor ac ON (rep.Actor_id = ac.Id) 
            join Pelicula pe ON (rep.Pelicula_id = pe.Id) where rep.id = (SELECT IDENT_CURRENT('Reparto'))
        `)

        return idRepartoCreado.recordset[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const EliminarReparto = async (idReparto) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`Delete from Reparto Where Id= ${idReparto}`);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    ObtenerRepartos, CrearReparto, EliminarReparto
}; 