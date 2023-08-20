import { connection } from "../repository/db";
import { MealType } from "../utils/enums";

const tableName = "meals";

/**
 * 
 * @param {Date} duedate format: 2023-08-25 18:30:00
 */
function getAllByDueDay(date) {
  connection.query(
    `SELECT * FROM ${tableName} WHERE duedate = " + date + " ORDER BY order desc`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {MealType} mealtype 
 */
function getByMealType(mealType) {
  connection.query(
    `SELECT * FROM ${tableName} WHERE mealtype = ${mealType}`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {Date} duedate format: 2023-08-25 18:30:00
 */
function getByDueDate(duedate) {
  connection.query(
    `SELECT * FROM ${tableName} WHERE duedate = ${duedate} AND mealtype = ${mealType}`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {Number} id 
 */
function getById(id) {
  connection.query(
    `SELECT * FROM ${tableName} WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {MealType} mealtype 
 * @param {Date} duedate format: 2023-08-25 18:30:00
 */
function create(mealtype, duedate) {
  connection.query(
    `INSERT INTO ${tableName} (${mealtype}, createdon, modifiedon, duedate) VALUES (1, NOW(), NOW(), '${duedate}')`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {Number} id 
 * @param {MealType} mealtype 
 */
function edit(id, mealtype) {
  connection.query(
    `UPDATE meals SET mealtype = ${mealtype}, modifiedon = NOW() WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

/**
 * 
 * @param {Number} id 
 */
function deleteById(id) {
  connection.query(`DELETE FROM meals WHERE id = ${id}`, function (err, rows) {
    if (err) {
      console.error(err);
    } else {
      console.log(rows);
    }
  });
}
