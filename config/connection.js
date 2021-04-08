const mysql = require("mysql");

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "cggg1403",
        database: "employeeDB"
    }
);

connection.connect();

module.exports = connection

