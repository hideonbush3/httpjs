const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'user.html'));
});

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'useradd.html'));
});

router.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'userview.html'));
});

module.exports = router;
