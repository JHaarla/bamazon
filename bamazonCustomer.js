const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

const table = new Table({
    head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
    colWidths: [12, 23, 18, 17, 10]
});

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
    // dbConnection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;
        
        for (let i = 0; i < results.length; i++) {
        table.push(
            [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
            // [results[1].item_id, results[1].product_name, results[1].department_name, results[1].price, results[1].stock_quantity]
        );}
        console.log(table.toString());
        // console.log(results);
    })
}