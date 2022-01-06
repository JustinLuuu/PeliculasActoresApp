const config = require('./dbConfig');
const sql = require('mssql');


const ObtenerActores = async () => {
    try {
        const conexion = await sql.connect(config);
        const results = await conexion.request().query(`
            Select id, nombre_completo, fecha_nacimiento, sexo, foto_url From Actor
            order by id desc
        `);
        return results.recordsets;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const CrearActor = async (actor) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`
            Insert into Actor
            values('${actor.nombre_completo}', '${actor.fecha_nacimiento}', 
            '${actor.sexo}', ${actor.foto_url ? `'${actor.foto_url}'` : null})
        `);

        const idActorCreado = await conexion.request().query(`
         SELECT IDENT_CURRENT('Actor') as id
        `)
        
        return idActorCreado.recordset[0].id;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const ActualizarActor = async (actor, idActor) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`
            Update Actor Set
            Nombre_completo= '${actor.nombre_completo}', Fecha_nacimiento= '${actor.fecha_nacimiento}',
            Sexo= '${actor.sexo}', Foto_url= ${actor.foto_url ? `'${actor.foto_url}'` : null} Where Id= ${idActor}
        `);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const EliminarActor = async (idActor) => {
    try {
        const conexion = await sql.connect(config);
        conexion.request().query(`Delete from Actor Where Id= ${idActor}`);        
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    ObtenerActores, CrearActor, ActualizarActor, EliminarActor
}; 
