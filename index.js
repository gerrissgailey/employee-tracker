const connection = require("./config/connection");

const {prompt} = require("inquirer");

require("console.table");

const startingQuestion = () => {
    prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: ["Create an Employee", "Create a Role", "Create a Department", "Delete an Employee", "Delete a Role", "Delete a Department", "View Employees", "View Roles", "View Departments", "View Employees by Manager", "View Employees by Department", "Update Employee Manager", "Update Employee Role", ]
    }).then(answer => {
        switch(answer.startQuestion) {
            case "Create an Employee":
                createEmployee();
                break;
            case "Create a Role":
                createRole();
                break;
            case "Create a Department":
                createDepartment();
                break;
            case "Delete an Employee":
                deleteEmployee();
                break;
            case "Delete a Row":
                deleteRow();
                break;
            case "Delete a Department":
                deleteDepartment();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Employees by Manager":
                viewEmpManager();
                break;
            case "View Employees by Department":
                viewEmpDepartment();
                break;
            case "Update Employee Manager":
                updateEmpManager();
                break;
            case "Update Employee Role":
                updateEmpRole();
                break;
            default:
                process.exit();
        }
    })
}

function createEmployee () {
    prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: ["Manager", "HR", "Sales Representative", "Engineer", "Technical Support", "Machinist",]
        },
        {
            type: "input",
            name: "isManager",
            message: "Is this employee a manager?"
        },
        {
            type: "input",
            name: "whoIsManager",
            message: "Who is this employee's manager?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.employeeRole,
            manager_id: answers.whoIsManager
        })
    })
}

function createRole () {
    prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role you would like to create?"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the starting salary for this role?"
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "What department does this role fall under?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO role SET ?", {
            title: answers.roleName,
            salary: answers.roleSalary,
            department_id: answers.roleDepartment
        })
    })
}

function createDepartment () {
    prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the department you would like to create?"
        }
    ]).then(answers => {
        connection.query ("INSERT INTO department SET ?", {
            department_name: answers.newDepartment
        })
    })
}

function deleteEmployee () {

}

function deleteRow () {

}

function deleteDepartment () {

}

function viewEmployees () {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name,' ',manager.last_name) AS manager, department.name FROM employee LEFT JOIN role ON employee.role_id = role.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
}

function viewRoles () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
}

function viewDepartments () {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
}

startingQuestion();

// will need to do joins somehow...? 