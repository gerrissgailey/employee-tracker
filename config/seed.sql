USE employeeDB;

INSERT INTO department(department_name)
VALUES ("Sales");

INSERT INTO department(department_name)
VALUES ("Engineering");

INSERT INTO department(department_name)
VALUES ("Machine Shop");

INSERT INTO department(department_name)
VALUES ("Applications");

INSERT INTO department(department_name)
VALUES ("Assembly");

INSERT INTO department(department_name)
VALUES ("Finance");


INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 90000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Salesman', 70000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Mechanical Engineer', 85000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Controls Engineer', 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Draftsman', 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Machinist', 80000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('CNC Machinist', 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Apps Tech', 75000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Apps Tech', 60000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Machine Assembly Tech', 60000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 100000, 6);

INSERT INTO role (title, salary, department_id)
VALUES ('Accounts Payable', 70000, 6);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Adams', 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Erika', 'Rodriguez', 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Alexa', 'Gilmore', 1, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('George', 'Lucas', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Don', 'Wright', 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sierra', 'Mist', 9, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Jackson', 5, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Peter', 'Jones', 4, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Andrew', 'Bush', 6, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Melissa', 'James', 7, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Antonio', 'Lopez', 8, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Damian', 'Marlo', 8, 4);