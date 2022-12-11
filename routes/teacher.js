const express = require("express");
const db = require("mysql");
const router = express.Router();

const connection = db.createConnection({
  host: 'localhost',
  user: 'abhishek',
  password: '123',
  database: 'students',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});


// Home page route.
router.get("/:id", function (req, res) {
 const branch = req.query.branch || null;
  const year = req.query.year || null;

  if (branch != null && year != null) {
    connection.query(
      "SELECT  * FROM bbs_students_data WHERE Branch = ? AND Year = ?",
      [branch, year],
      (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
      })
  }
  else if (branch != null) {
    connection.query(
      "SELECT  * FROM bbs_students_data WHERE Branch = ? ",
      [branch],
      (err, result) => {
        if (err) throw err;
        res.status(200).json(result)
      })
  }

  else if (year != null) {
    var student_data = []
     connection.query("SELECT * FROM bbs_students_data WHERE Year = ?",
      [year],
      (err, result) => {
        if (err) throw err;
        student_data.push(result)
      })
    if (student_data == [] ) {
      res.status(200).json({code:404, data : []})
    }
    else {
    connection.query(
      "SELECT Subjects, Code FROM subjects WHERE Year = ?",
      [year],
      (err, result) => {
        if (err) throw err;
        res.status(200).json({code : 200, data : student_data[0], subjects : result})
      })
    }
  }
  else {
    res.status(401).json({code:401, data:[], message: "incorrect query"})
  }
  
});

router.get("*", function (req, res) {
  res.status(404).json({code:401, data:[], message: "Not Found"})
});

module.exports = router;
