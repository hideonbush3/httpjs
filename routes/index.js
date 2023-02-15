const express = require("express");
const router = express.Router();
const path = require("path");

// show index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 단순한 그림파일을 화면에 표시하기 위해
// 일일이 라우팅 설정하는 것은 번거로움
// router.get("/smile.png", (req, res) => {
// // 응답으로 지정한 파일의 내용을 전송함
//   res.sendFile(path.join(__dirname, '../static/img', 'smile.png'));
// });

module.exports = router;
