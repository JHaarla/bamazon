const mysql = require("mysql");
const inquirer = require("inquirer");

const dbConnection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon! Here's what we have for sale today:");
    // dbConnection.end();
    listProducts();
});

function listProducts() {
    dbConnection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log(results);
    })
}