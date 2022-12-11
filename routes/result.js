const express = require("express");
const db = require("mysql");
const router = express.Router();

const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: 'abhishek',
  password: '123',
  database: 'students',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to database!');
});

router.get("/:roll_num", function (req, res) {
  connection.query(
    "SELECT DISTINCT bbs_students_data.*, subjects.Subjects  FROM bbs_students_data LEFT JOIN subjects ON bbs_students_data.Code  = subjects.Code WHERE Roll_Number = ?",
    [req.params.roll_num],
    (err, result) => {
      if (err) throw err;
      if (result.length < 1) {
        res.status(404).json({ status: "not found", data: [], message: "No student found with this roll number" });
        return
      }
      res.status(200).json({status: 'success', data: result[0]})

    })
});

router.get("*", function (req, res) {
  res.status(404).json([]);
});

module.exports = router;
