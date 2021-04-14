const connection = require("./config/connection");

const { prompt } = require("inquirer");

require("console.table");

const startingQuestion = () => {
    prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: ["Create an Employee", "Create a Role", "Create a Department", "Delete an Employee", "Delete a Role", "Delete a Department", "View Employees", "View Roles", "View Departments", "Update Employee Role"]
        // "View Employees by Manager", "View Employees by Department", "Update Employee Manager"
    }).then(answer => {
        switch (answer.startQuestion) {
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
                deleteRole();
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
            case "Update Employee Role":
                updateEmpRole();
                break;
            // case "View Employees by Manager":
            //     viewEmpManager();
            //     break;
            // case "View Employees by Department":
            //     viewEmpDepartment();
            //     break;
            // case "Update Employee Manager":
            //     updateEmpManager();
            //     break;
            default:
                process.exit();
        }
    })
}

function createEmployee() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, department.department_name,
    role.salary, employee.manager_id 
      FROM employee
      INNER JOIN role on role.id = employee.role_id
      INNER JOIN department ON department.id = role.department_id`, (err, results) => {
        if (err) throw err;
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
                choices: results.map(role => {
                    return { name: role.title, value: role.id }
                })
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
                manager_id: answers.whoIsManager,
            })
            startingQuestion();
        })
    })
    // console.log(addEmpQuery.sql);
}

function createRole() {
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
        startingQuestion();
    })
}

function createDepartment() {
    prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the department you would like to create?"
        }
    ]).then(answers => {
        connection.query("INSERT INTO department SET ?", {
            department_name: answers.newDepartment
        })
        startingQuestion();
    })
}

function deleteEmployee() {
    let firstQuery = connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        prompt([
            {
                type: "list",
                name: "empID",
                message: "Select the employee you would like to remove.",
                choices: res.map(employee => {
                    return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
                })
            }
        ]).then(answer => {
            let secondQuery = connection.query("DELETE FROM employee WHERE ?", [{ id: answer.empID }], (err) => {
                if (err) throw err;
                console.log("Employee has been removed.");
                startingQuestion();
            })
        });
    });
};

function deleteRole () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        prompt([
            {
                type: "list",
                name: "roleID",
                message: "Select the role you would like to remove.",
                choices: res.map(role => {
                    return { name: `${role.title}`, value: role.id }
                })
            }
        ]).then(answer => {
            connection.query("DELETE FROM role WHERE ?", [{ id: answer.roleID }], (err) => {
                if (err) throw err;
                console.log("Role has been removed.");
                startingQuestion();
            })
        });
    });
    // console.log(firstQuery.sql);
};

function deleteDepartment () {
    let firstQuery = connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        prompt([
            {
                type: "list",
                name: "departmentID",
                message: "Select the department you would like to remove.",
                choices: res.map(department => {
                    return { name: `${department.title}`, value: department.id }
                })
            }
        ]).then(answer => {
            let secondQuery = connection.query("DELETE FROM department WHERE ?", [{ id: answer.departmentID }], (err) => {
                if (err) throw err;
                console.log("Department has been removed.");
                startingQuestion();
            })
        });
    });
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

function updateEmpRole () {
    let query = connection.query("SELECT * FROM employee", (err, res) => {
        const employees = response.map(function (element) {
            return {
                name: `${element.first_name} ${element.last_name}`,
                value: element.id
            }
        });

        prompt([
            {
                type: "list",
                name: "employeeID",
                message: "Which employee would you like to update a role for?",
                choices: employees
            }
        ]).then(input1 => {
            connection.query("SELECT * FROM role", (err, data) => {
                const roles = data.map(function (role) {
                    return {
                        name: role.title,
                        value: role.id
                    }
                });

                prompt([
                    {
                        type: "list",
                        name: "roleID",
                        message: "What is the employee's new role?",
                        choices: roles
                    }
                ]).then(input2 => {
                    const secondQuery = connection.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?", [input2.roleID, input1.employeeID], function (err, res) {
                        let newEmpRole;

                        for (let i = 0; i < roles.length; i++) {
                            if (roles[i].value == input2.roleID) {
                                newEmpRole = roles[i].name;
                            }
                        }

                        let employeeName;
                        for (let j = 0; j < employees.length; j++) {
                            if (employees[j].value == input1.employeeID) {
                                employeeName = employees[j].name;
                            }
                        }

                        if (res.changedRows === 1) {
                            console.log(`Success! Role for ${employeeName} has been updated to ${newEmpRole}`);
                        } else {
                            console.log(`Failed: Current role for ${employeeName} is still ${newEmpRole}`)
                        }

                        startingQuestion();
                    })
                })
            })
        })
    });

};

function viewEmpManager () {

};

function viewEmpDepartment () {

};

function updateEmpManager () {

};


startingQuestion();

// will need to do joins somehow...? 