const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Toneloc!22",
        database: "company",
    }
);

module.exports = db;