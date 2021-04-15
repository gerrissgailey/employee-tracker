const connection = require("./config/connection");

const { prompt } = require("inquirer");

require("console.table");

const startingQuestion = () => {
    prompt({
        type: "list",
        name: "startQuestion",
        message: "What would you like to do?",
        choices: ["Create an Employee", "Create a Role", "Create a Department", "Delete an Employee", "Delete a Role", "Delete a Department", "View Employees", "View Roles", "View Departments", "Update Employee Role"]
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
            case "Delete a Role":
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
            default:
                process.exit();
        }
    })
}

function createEmployee() {
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
    ]).then(answers => {
      connection.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        prompt([
          {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: results.map(role => {
              return ({ name: role.title, value: role.id })
            })
          },
        ]).then(({ employeeRole }) => {
          connection.query("SELECT * FROM employee WHERE role_id = 1", (err, managers) => {
            if (err) throw err;
            prompt([
              {
                type: "list",
                name: "whoIsManager",
                message: "Who is this employee's manager?",
                choices: [...managers.map(manager => {
                  return ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })
                }), { name: 'No Manager', value: 0 }]
              },
            ]).then(({ whoIsManager }) => {
              connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: employeeRole,
                manager_id: whoIsManager,
              })
              startingQuestion();
            })
          })
        })
      })
    })
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
    ]).then(answers => {
        connection.query("SELECT * FROM department", (err, results) => {
            if (err) throw err;
            prompt([
                {
                    type: "list",
                    name: "roleDepartment",
                    message: "What department does this role fall under?",
                    choices: results.map(department => {
                        return ({ name: department.department_name, value: department.id })
                      })
                },
                
            ]).then(({ roleDepartment }) => {
                connection.query("INSERT INTO role SET ?", {
                    title: answers.roleName,
                    salary: answers.roleSalary,
                    department_id: roleDepartment
                })
                startingQuestion();
            })
        })
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
    connection.query("SELECT * FROM employee", (err, res) => {
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
            connection.query("DELETE FROM employee WHERE ?", [{ id: answer.empID }], (err) => {
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
};

function deleteDepartment () {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        prompt([
            {
                type: "list",
                name: "departmentID",
                message: "Select the department you would like to remove.",
                choices: res.map(department => {
                    return { name: `${department.department_name}`, value: department.id }
                })
            }
        ]).then(answer => {
            connection.query("DELETE FROM department WHERE ?", [{ id: answer.departmentID }], (err) => {
                if (err) throw err;
                console.log("Department has been removed.");
                startingQuestion();
            })
        });
    });
};

function viewEmployees () {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
};

function viewRoles () {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
};

function viewDepartments () {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        startingQuestion();
    });
};

function updateEmpRole () {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        const employees = res.map(function (element) {
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
                    connection.query("UPDATE employee SET employee.role_id = ? WHERE employee.id = ?", [input2.roleID, input1.employeeID], function (err, res) {
                        if (err) throw err;
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

startingQuestion();

