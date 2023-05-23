// const express = require("express");
// const router = express.Router();
// const db = require("../../db/connection.js");

// router.get("/test", (_request, response) => {
//   const create = (username, email, password) => {
//     db.one(
//       "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
//       [username, email, password]
//     ).then(data => {
//       console.log("User created with ID: ", data.id);
//       return data.id;
//     }).catch(err => {
//       console.log("Error in user creation", err);
//       throw err; // throw the error to be handled by the calling function
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

router.get("/", (_request, response) => {
  console.log("test");
  db.any(`INSERT INTO test_table ("test_string") VALUES ($1)`, [
    `Hello on ${new Date().toLocaleDateString("en-us", {
      hour: "numeric",
      minute: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    })}`,
  ])
    .then((_) => db.any(`SELECT * FROM test_table`))
    .then((results) => response.json(results))
    .catch((error) => {
      console.log(error);
      response.json({ error });
    });
});

module.exports = router;
