const inquirer = require("inquirer");
const db = require("./connection");
  
//got help from someone on this
class DB{
    constructor(db){
        this.db = db
    }
    findAllDepartments() {
        return this.db.promise().query("SELECT * FROM departments");
    }
    findAllRoles() {
        return this.db.promise().query("SELECT * FROM roles");
    }
    findAllEmployees() {
        return this.db.promise().query("SELECT * FROM employees");
    }
}
module.exports = new DB(db);