const inquirer = require("inquirer");
const mysql = require("mysql2");
/*const chalk = require("chalk");*/
const db = require("./db/connection");
require("console.table");
const log = console.log;

function init() {
  log("BOOTING UP PROGRAM!")
  promptUser();
}

//help from a friend on connecting the db
db.connect((err) => {
  if (err) throw err;
  console.log("Database Functional");
  prompt();
})
/*prompting the user with many selections*/

function prompt() {
  inquirer.prompt({
    type: "list",
    name: "startingScreen",
    message: "Where would you like to go? Make your selection.",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Exit app",
    ],
  })
    .then((answers) => {
      switch (answers.startingScreen) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();

      }
    })
}


//View all Departments
function viewAllDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
    console.table(res);
    prompt();
  });
}

//View all Roles
function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
    console.table(res);
    prompt();
  });
}

//View all Employees
function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, res) => {
    console.table(res);
    prompt();
  });
}

//Add a Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDep",
        message: "What department would you like to add?",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO departments (department_name)
                   VALUES (?)`;
      db.query(sql, answer.addDep, (err, result) => {
        if (err) throw err;
        viewAllDepartments();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_first_name",
        message: "What is this employees first name?",
      },
      {
        type: "input",
        name: "new_last_name",
        message: "What is this employees last name?",
      },
      {
        type: "input",
        name: "new_job_title",
        message: "What is this employees job title?"
      },
      {
        type: "input",
        name: "employeeRole",
        message: "What role ID does this employee have?",
      },
      {
        type: "input",
        name: "employeeManager",
        message: "Who is this employees manager?",
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employees (first_name, last_name, job_title, roles_id, manager_id)
                   VALUES (?,?,?,?,?)`;
      const values = [
        answers.new_first_name,
        answers.new_last_name,
        answers.new_job_title,
        answers.employeeRole,
        answers.employeeManager
      ];
      db.query(sql, values, (err, rows) => {
        if (err) {
          throw err;
        }
        viewAllEmployees();
        console.table(rows);
        prompt();
      })
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_title",
        message: "What is this new role?",
      },
      {
        type: "input",
        name: "new_salary",
        message: "What is this roles salary?",
      },
      {
        type: "input",
        name: "new_department_ID",
        message: "What is this roles department ID?"
      }
    ])
    .then((answers) => {
      const sql = `INSERT INTO roles (title, salary, department_id)
                   VALUES (?,?,?)`;
      const values = [
        answers.new_title,
        answers.new_salary,
        answers.new_department_ID
      ];
      db.query(sql, values, (err, rows) => {
        if (err) {
          throw err;
        }
        viewAllRoles();
        console.table(rows);
        prompt();
      })
    });
}
