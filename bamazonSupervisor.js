const cTable = require('console.table')
var inquirer = require('inquirer')
var mysql = require('mysql')

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
    inquirer.prompt([
        {
            name: 'userChoice',
            type: 'list',
            message: 'How can I help you?',
            choices: ['View Sales Department.', 'Create New Department.', 'Exit \n\n']
        }
    ]).then(function(answer){
        console.log(answer.userChoice)

        switch (answer.userChoice) {
            case 'View Sales Department.':
                logSales();
                break;
            case 'Create New Department.':
                addDepartment();
                break;
            default : connection.end();
        }        
    })
}

function logSales() {
    var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_costs, '
    query += 'SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) '
    query += 'AS total_profit FROM departments LEFT JOIN products ON products.department_name = departments.department_name '
    query += 'GROUP BY departments.department_id, departments.department_name, departments.over_head_costs '
    
    connection.query(query, function (err, results){
        if (err) throw err       
        console.table(results)      
        start()
    })
}

function addDepartment() {
    
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'Enter name of department.'
        },
        {
            name: 'overHead',
            type: 'number',
            message: 'How much in over-head costs?',
            validate: function(value) {
                if (isNaN(value)) {
                return false;
                }
                return true;
            }
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO departments SET ?", 
            {
                department_name: answer.departmentName,
                over_head_costs: answer.overHead
            },
            function(err, res) {
                if (err) throw err;  
                console.log(res.affectedRows + " department inserted!\n")       
                start()
            }
        )        
    })
}