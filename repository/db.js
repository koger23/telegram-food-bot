import Connection from "mysql";
import { Secrets } from "../secrets.js";

/**
 * MySQL or MariaDB connection
 */
export var connection = Connection.createConnection({
  host: Secrets.MYSQL.HOST,
  user: Secrets.MYSQL.USERNAME,
  password: Secrets.MYSQL.PASSWORD,
  database: Secrets.MYSQL.DB,
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected!:)");
  }
});
