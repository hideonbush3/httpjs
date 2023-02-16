const express = require("express");
const router = express.Router();
const path = require("path");
const html = "text/html; charset=utf-8";

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "user.html"));
  res.render('user', {title: 'user페이지'});
});


router.get("/add", (req, res) => {
  res.type(html);
  res.end("<h1>user/add 페이지</h1>");
});

router.get("/view", (req, res) => {
  res.type(html);
  res.end("<h1>user/view 페이지</h1>");
});

module.exports = router;
