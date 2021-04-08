const connection = require("./config/connection");

const {prompt} = require("inquirer");

require("console.table");

const startingQuestion = () => {
    prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: ["Create Employee"]
    }).then(answer => {
        switch(answer.startQuestion) {
            case "Create Employee":
                createEmployee();
                break;
            // case "Delete Employee"
            // add more cases here
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
            name: "",
            message: "What is the employee's role?",
            choices: ["HR", "Janitor"]
        },
        {
            type: "input",
            name: 
            message: "Is this employee a manager?"
        },
        {
            type: "input",
            name: 
            message: "Who is this employee's manager?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO employee SET ?", {
            first_name: answers.firstName,
            last_name: answers.lastName,
            // add more columns here for remaining questions
        })
    })
}
    
// create other functions to handle roles and department down here

// will need to do joins somehow...? 