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
    `);
    taskChoice();
});

function taskChoice() {
    inquirer
        .prompt([
            {
                name: "whatDo",
                type: "list",
                message: "What would you like to do?",
                choices: ["View products for sale", "View low inventory items", "Add to inventory", "Add a new product", "Exit"]
            }

        ]).then(function (action) {
            if (action.whatDo === "View products for sale") {
                listProducts();
            } else if (action.whatDo === "View low inventory items") {
                listLowInv();
            } else if (action.whatDo === "Add to inventory") {
                addInv();
            } else if (action.whatDo === "Add a new product") {
                addProd();
            }

            else {
                dbConnection.end();
            }
        })
}

function listProducts() {
    table = "";

    table = new Table({
        head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
        colWidths: [12, 23, 18, 17, 10]
    });

    dbConnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        for (let i = 0; i < results.length; i++) {
            table.push(
                [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price.toFixed(2), results[i].stock_quantity]
            );
        }
        console.log(table.toString());
        taskChoice()
        // console.log(results);
    })
}

function listLowInv() {
    table = "";
    table = new Table({
        head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
        colWidths: [12, 23, 18, 17, 10]
    });
    dbConnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
                );
            }
        }
        console.log(table.toString());
        taskChoice()
    })
}

function listLowInv2() {
    table = "";
    table = new Table({
        head: ["Product ID", "Product Name", "Department Name", "Price", "Stock"],
        colWidths: [12, 23, 18, 17, 10]
    });
    dbConnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (let i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                table.push(
                    [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
                );
            }
        }
        console.log(table.toString());
    })
}

function addInv() {
    listLowInv2();
    dbConnection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "itemID",
                    type: "input",
                    message: "Please enter the Product ID of the item you'd like to add:"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please enter the quantity you'd like to add:"
                }
            ])
            .then(function (answer) {
                var chosenID;
                for (var i = 0; i < results.length; i++) {
                    // console.log('results', results[i])
                    if (results[i].item_id === parseInt(answer.itemID)) {
                        chosenID = results[i];
                        //  console.log(chosenID);
                        dbConnection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (parseInt(chosenID.stock_quantity) + parseInt(answer.quantity))
                                },
                                {
                                    item_id: chosenID.item_id
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.info("\n=====================================")
                                console.log(answer.quantity + " " + chosenID.product_name + "s" + " have been added.");
                                console.info("=====================================\n")
                                taskChoice();
                            })
                    }
                }
            })
    })
}

function addProd() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Please enter the name of the product you'd like to add:"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you'd like to add:"
            },
            {
                name: "price",
                type: "input",
                message: "Please enter the price:"
            },
            {
                name: "dept",
                type: "input",
                message: "Please enter the department for the product:"
            }
        ])
        .then(function (answer) {
            var productName = answer.name;
            var deptName = answer.dept;
            var price = answer.price;
            var stock = answer.quantity;
                    dbConnection.query(
                        "INSERT INTO products SET ?",
                        [
                            {
                                product_name: productName,
                                department_name: deptName,
                                price: price,
                                stock_quantity: stock
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.info("\n=====================================")
                            console.log("New product has been added for sale!");
                            console.info("=====================================\n")
                            taskChoice();
                        })
                }
        )
}