import { connection } from "../repository/db";
import { MealType } from "../utils/enums";

function getAllOnDay(date) {
  connection.query(
    "SELECT * FROM meals WHERE duedate = " + date + " ORDER BY order desc",
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
 * Get a meal by date and type.
 * @param {Text} date 
 * @param {MealType} mealType 
 */
function get(date, mealType) {
  connection.query(
    "SELECT * FROM meals WHERE duedate = " + date + " AND mealtype" + mealType,
    function (err, rows) {
      if (err) {
        console.error(err);
      } else {
        console.log(rows);
      }
    }
  );
}

function add()
