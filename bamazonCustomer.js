var mysql = require('mysql')
var inquirer = require('inquirer')
var chosenItem
var amountLeft 
var totalPaid
var itemIndex

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3307,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId + "\n");
    start()
})

function start() {
    chosenItem = ''
    amountLeft = ''
    totalPaid = ''
    inquirer.prompt([
        {
            name: 'userChoice',
            type: 'list',
            message: 'How can I help you?',
            choices: ['Make a purchase.', 'Exit \n\n']
        }
    ]).then(function(answer){
        console.log(answer.userChoice)
        if (answer.userChoice === 'Make a purchase.'){
            customerOrder()
        }else {
            connection.end()
        }
        
    })
}

function customerOrder() {
    console.log('Here are our current products to choose from: \n')
    connection.query('SELECT item_id, product_name, price FROM products', function(err, results){
        if (err) throw err
        console.table(results)    

        inquirer.prompt([
            {
                name: "item_id",
                type: 'number',
                message: 'Enter the product\'s ID number you would like to purchase.',
                validate: function(value) {
                    
                    if (isNaN(value)) {   
                        console.log('\n Please enter the id number matching the product you want to purchase.')
                        return false
                    } else if (value < 1) {       
                        console.log('\n Please enter the id number matching the product you want to purchase.')         
                        return false
                    } else {
                        return true
                    }
                }
            },
            {
                name: "item_amount",
                type: 'number',
                message: 'How many of this item would you like to purchase?',
                validate: function(value) {                    
                    if (isNaN(value)) {                        
                        return false
                    } else {
                        return true
                    }
                }
            }
        ]).then(function(answer) {
            
            connection.query(
                'SELECT item_id, price, stock_quantity, product_sales FROM products', function(err, results) {
                    if (err) throw err
                    
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].item_id === answer.item_id) {       
                            chosenItem = results[i]
                            itemIndex = i
                        }
                    }
                    
                    if (itemIndex === undefined) {
                        console.log('This item ID is not available.')
                        start()
                    } else if (answer.item_amount > chosenItem.stock_quantity){
                        console.log('Insufficient quantity. Please choose a lower amount.')
                        start()
                    } else {
                        totalPaid = answer.item_amount * results[itemIndex].price
                        amountLeft = chosenItem.stock_quantity - answer.item_amount
                        console.log('Purchase has been placed. Your total comes to $' + totalPaid)
                        totalPaid += results[itemIndex].product_sales
                        updateProduct()                       
                    }
                }
            )
        })
    })
    
}

function updateProduct() {
    var query = connection.query(
        "UPDATE products SET ?, ? WHERE ?",
        [
            {
                stock_quantity: amountLeft
            },
            {
                product_sales: totalPaid
            },
            {
                item_id: chosenItem.item_id
            }
        ],
        function(err, res) {
            if (err) throw err;     
            console.log(res.affectedRows + " product updated!\n")       
            start()
        }
    )
    console.log(query.sql)
}