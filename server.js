const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log(process.env.DB_USERNAME);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Question 1 goes here
app.get("/patients", (req, res) => {
  const sql =
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Question 2 goes here
app.get("/providers", (req, res) => {
  const providers = req.query.providers;
  const sql = "SELECT first_name, last_name, provider_specialty FROM providers";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(providers);
  });
});

// Question 3 goes here
app.get("/patients", (req, res) => {
  const patients = req.query.patients;
  const sql = "SELECT first_name FROM patients WHERE first_name = ?";

  db.query(sql, [patients], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ results: results });
  });
});

// Question 4 goes here
app.get("/providers_specialty", (req, res) => {
  const specialty = req.query.specialty;
  console.log({ specialty });
  const sql =
    "SELECT  first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";

  db.query(sql, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ results: results });
  });
});

// listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
