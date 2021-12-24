const inquirer = require("inquirer");
const mysql = require("mysql2");
/*const chalk = require("chalk");*/
const db = require("./db/connection");
const consoleTable = require("console.table");
const log = console.log;

function init() {
    log("BOOTING UP PROGRAM!")
    promptUser();
}

/*prompting the user with many selections*/ 

module.exports = promptUser = async () => {
    const data = await inquirer.prompt({
        type: "list",
        name: "action",
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
    });
    switch (data.action) {
        case "View all departments":
          showDep();
          break;
        case "View all roles":
          showRoles();
          break;
        case "View all employees":
          showEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
      
        case "Exit app":
          log(`--------------- Thank you for entering! Program Shutdown ---------------`);
          db.end();
          break;
      }
    
};

//View all Departments
function showDep() {
    const sql = `SELECT * FROM departments`;
    connection.query(sql, (err, res) => {
      console.table(res);
      prompt();
    });
  }
  
  //View all Roles
  function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    connection.query(sql, (err, res) => {
      console.table(res);
      prompt();
    });
  }
  
  //View all Employees
  function viewAllEmployees() {
    const sql = `SELECT * FROM employees`;
    connection.query(sql, (err, res) => {
      console.table(res);
      prompt();
    });
  }
  
  //Add a Department
  function newDepartment() {
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
        connection.query(sql, answer.addDep, (err, result) => {
          if (err) throw err;
          viewAllDepartments();
        });
      });
  }
  
  function addNewEmployee() {
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
          type:"input",
          name:"new_job_title",
          message:"What is this employees job title?"
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
        const params = [
          answers.new_first_name,
          answers.new_last_name,
          answers.new_job_title,
          answers.employeeRole,
          answers.employeeManager
        ];
        connection.query(sql, params, (err, rows) => {
          if (err) {
            throw err;
          }
          viewAllEmployees();
          console.table(rows);
          prompt();
        })
      });
  }
  
  function addNewRole() {
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
          type:"input",
          name:"new_department_ID",
          message:"What is this roles department ID?"
        }
      ])
      .then((answers) => {
        const sql = `INSERT INTO roles (title, salary, department_id)
                   VALUES (?,?,?)`;
        const params = [
          answers.new_title,
          answers.new_salary,
          answers.new_department_ID
        ];
        connection.query(sql, params, (err, rows) => {
          if (err) {
            throw err;
          }
          viewAllRoles();
          console.table(rows);
          prompt();
        })
      });
  }

init();