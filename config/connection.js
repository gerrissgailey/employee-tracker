const mysql = require("mysql");

const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "cggg1403",
        database: "employeeDB"
    }
);

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection

