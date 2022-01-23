 const config = {
    user: 'sa',
    password: '1234',
    server: 'localhost\\SQLEXPRESS', 
    database: 'PeliculasActoresApp',
    options: {
        trustedConnection: true, 
        trustServerCertificate: true,
    },
    port: 1433
};

module.exports = config; 
