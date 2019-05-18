var mysql = require('mysql')
var inquirer = require('inquirer')
var chosenItem
var addAmount 

var connection = mysql.createConnection({
    host: "localhost",

    port: 3307,
    
    user: "root",
  
    password: "root",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId + "\n");
    start()
})

function start() {
    
    inquirer.prompt([
        {
            name: 'userChoice',
            type: 'list',
            message: 'How can I help you?',
            choices: ['View Products.', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit \n\n']
        }
    ]).then(function(answer){
        
        switch(answer.userChoice) {
            case 'View Products.': 
                listProducts()
                break
            case 'View Low Inventory':
                lowInventory()
                break
            case 'Add To Inventory':
                orderInventory()
                break
            case 'Add New Product':
                addProduct()
                break
            default: connection.end()            
        }       
    })
}

function listProducts() {
    console.log('Here is our current inventory: \n')
    connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, results){
        if (err) throw err
        console.table(results)  
        start()  
    })
}

function lowInventory() {
    console.log('Current low inventory: \n')
    connection.query('SELECT item_id, product_name, stock_quantity FROM products', function(err, results){
        if (err) throw err
        var lowItems = []
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                lowItems.push(results[i])
            }
        }
        console.table(lowItems)  
        start()  
    })
}

function orderInventory() {
    chosenItem = ''
    addAmount = ''
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'itemId',
                type: 'number',
                message: 'Enter item Id.',
                validate: function(value) {
                    if (isNaN(value) || value < 1) {
                    return false;
                    } 
                    return true;
                }
            },
            {
                name: 'quantity',
                type: 'number',
                message: 'How much would you like to add to inventory?',
                validate: function(value) {
                    if (isNaN(value)) {
                    return false;
                    }
                    return true;
                }
            }
        ]).then(function(answer){          

            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === answer.itemId) {
                    addAmount = results[i].stock_quantity + answer.quantity
                    chosenItem = results[i]       
                }
            }

            var query = connection.query(
                "UPDATE products SET ? WHERE ?", 
                [
                    {
                        stock_quantity: addAmount
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ],
                function(error, res) {
                    if (error) throw err;            
                    start()
                }
            )
            console.log(query.sql)
        })
    })
}

function addProduct() {
    
    inquirer.prompt([
        {
            name: 'itemName',
            type: 'input',
            message: 'Enter name of product.'
        },
        {
            name: 'departmentName',
            type: 'input',
            message: 'Enter the department this belongs in.'
        },
        {
            name: 'quantity',
            type: 'number',
            message: 'How many of these will be in stock?',
            validate: function(value) {
                if (isNaN(value)) {
                return false;
                }
                return true;
            }
        },
        {
            name: 'price',
            type: 'number',
            message: 'How much will this item cost?',
            validate: function(value) {
                if (isNaN(value)) {
                return false;
                }
                return true;
            }
        }
    ]).then(function(answer){
        var query = connection.query(
            "INSERT INTO products SET ?", 
            {
                product_name: answer.itemName,                    
                stock_quantity: answer.quantity,                    
                price: answer.price,
                department_name: answer.departmentName,
                product_sales: 0
            },
            function(err, res) {
                if (err) throw err;  
                console.log(res.affectedRows + " product inserted!\n")       
                start()
            }
        )
        console.log(query.sql)        
    })
}