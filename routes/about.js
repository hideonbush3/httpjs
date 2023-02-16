const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, '../public', 'about.html'));
  res.render('about', {title: 'about페이지'})
});

module.exports = router;
