const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const employeeTracker = async () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do? ",
        name: "options",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Departments",
          "Update Employee Role",
        ],
      },
      {
        type: "input",
        message: "What is the name of your department? ",
        name: "newdepartment",
        when: (answers) => {
          if (answers.options == "Add Department") {
            return true;
          } else {
            return false;
          }
        },
      },

      {
        type: "input",
        message: "What is the title of the role? ",
        name: "newrole",
        when: (answers) => {
          if (answers.options == "Add Role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        message: "What is the salary of the role? ",
        name: "newrolesalary",
        when: (answers) => {
          if (answers.options == "Add Role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        message: "What is the department of the role? ",
        name: "newroledepartment",
        when: (answers) => {
          if (answers.options == "Add Role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        message: "What is the name of your department? ",
        name: "newdepartment",
        choices: async () => {
          const [rows, field] = await connection
            .promise()
            .query("SELECT name FROM department");
          return rows;
        },
        when: (answers) => {
          if (answers.options == "Add Department") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        message: "What is the first name of the employee? ",
        name: "employeefirstname",
        when: (answers) => {
          if (answers.options == "Add Employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "input",
        message: "What is the last name of the employee? ",
        name: "employeelastname",
        when: (answers) => {
          if (answers.options == "Add Employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        message: "What is the role of the employee? ",
        name: "newroleid",
        choices: async () => {
          const [rows, field] = await connection
            .promise()
            .query(`SELECT title FROM role`);
          const roleArr = [];
          rows.forEach((item) => {
            return roleArr.push(item.title);
          });
          return roleArr;
        },
        when: (answers) => {
          if (answers.options == "Add Employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        message: "Who is the manager of the employee? ",
        name: "newemployeemanager",
        choices: async () => {
          let query1 = `SELECT concat(first_name,' ',last_name) AS manager FROM employee`;
          let query2 = `SELECT concat(first_name,' ',last_name) AS manager FROM employee WHERE manager_id IS NULL`;

          const [rows, field] = await connection.promise().query(query1);
          const managerArr = [];
          rows.forEach((item) => {
            return managerArr.push(item.manager);
          });
          return managerArr;
        },
        when: (answers) => {
          if (answers.options == "Add Employee") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        message: "Which employee to update with new role? ",
        name: "updateemployeerole",
        choices: async () => {
            const [rows, field] = await connection.promise().query(`SELECT concat(first_name,' ',last_name) AS currentEmployee FROM employee `)
            const emplyArr = [];
            rows.forEach(item => {
                return emplyArr.push(item.currentEmployee)
            })
            return emplyArr;
        },
        when: (answers) => {
          if (answers.options == "Update Employee Role") {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        type: "list",
        message: "What is the new employee role? ",
        name: "updateEmployeeRoleId",
        choices: async () => {
            const [rows, field] = await connection.promise().query(`SELECT title FROM role`)
            const roleArr = [];
            rows.forEach(item => {
                return roleArr.push(item.title)
            })
            return roleArr;
        },
        when: (answers) => {
          if (answers.options == "Update Employee Role") {
            return true;
          } else {
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers.options);
    });
};

employeeTracker();
