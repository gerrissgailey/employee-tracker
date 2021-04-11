const connection = require("./config/connection");

const {prompt} = require("inquirer");

require("console.table");

const startingQuestion = () => {
    prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: ["Create Employee", "Create Role", "Create Department", "Delete Employee"]
    }).then(answer => {
        switch(answer.startQuestion) {
            case "Create Employee":
                createEmployee();
                break;
            case "Create Role":
                createRole();
                break;
            case "Create Department":
                createDepartment();
                break;
            case "Delete Employee":
                deleteEmployee();
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


// will need to do joins somehow...? 