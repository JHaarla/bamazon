const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

var table = new Table({
    head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
    colWidths: [12, 23, 18, 17, 10]
});

const dbConnection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

dbConnection.connect(function (err) {
    if (err) throw err;
    console.log(`
===================================
        Welcome to BAMAZON! 
===================================

Here's what we have for sale today:
`);
    listProducts();
});

function listProducts() {

    dbConnection.query("SELECT * FROM products", function (err, results) {
        // dbConnection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;

        for (let i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price.toFixed(2), results[i].stock_quantity]
                // [results[1].item_id, results[1].product_name, results[1].department_name, results[1].price, results[1].stock_quantity]
            );
        }
        console.log(table.toString());
        // console.log(results);
        buyProduct();
    })
}

function buyProduct() {
    dbConnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "itemID",
                    type: "input",
                    message: "Please enter the Product ID of the item you'd like to purchase:"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the quantity you'd like to purchase:"
                }
            ])
            .then(function (answer) {
                var chosenID;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.itemID)) {
                        // console.log('results', results[i])
                        chosenID = results[i];
                        //  console.log(chosenID);
                    }
                }

                // console.log('chosenID', chosenID)

                if (chosenID.stock_quantity >= parseInt(answer.quantity)) {
                    dbConnection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenID.stock_quantity - answer.quantity)
                            },
                            {
                                item_id: chosenID.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.info("\n=====================================")

                            console.log("Thank you for your order. It has been placed.");
                            // console.log("Your credit card will be charged $" + ((parseFloat(chosenID.price.replace(/,/g, ""))) * (answer.quantity)).toFixed(2));
                            console.log("Your credit card will be charged $" + ((parseFloat(chosenID.price)) * (answer.quantity)).toFixed(2));
                            console.info("=====================================\n")
                            buyMore()
                        }
                    )
                } else {
                    console.info("\n=====================================")
                    console.log("We don't have enough " + chosenID.product_name + "s!");
                    // dbConnection.end();
                    buyMore();
                }
            })
    })
}

function buyMore() {
    inquirer
        .prompt([
            {
                name: "buyMore",
                type: "list",
                message: "Would you like to purchase something else or exit?",
                choices: ["Make another purchase", "I'm done"]
            }
            
        ]).then(function(action) {
            if (action.buyMore === "Make another purchase") {
                relistProducts();
            } else {
                dbConnection.end();
            }
        })
}


function relistProducts() {

    table = "";

    table = new Table({
        head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
        colWidths: [12, 23, 18, 17, 10]
    });
    

    dbConnection.query("SELECT * FROM products", function (err, results) {
        // dbConnection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) {
        if (err) throw err;

        for (let i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price.toFixed(2), results[i].stock_quantity]
                // [results[1].item_id, results[1].product_name, results[1].department_name, results[1].price, results[1].stock_quantity]
            );
        }
        console.log(table.toString());
        // console.log(results);
        buyProduct();
    })
}