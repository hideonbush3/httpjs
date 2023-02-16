const express = require("express");
const router = express.Router();
const path = require("path");

// show index page
router.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '../public', 'index.html'));

  // handlebars 뷰 엔진으로 응답처리
  // render의 매개변수는 laybody에 들어갈 hbs 파일명, layout.hbs
  // render 매개변수중 view 이름에 확장자 .hbs 쓸 필요없음
  // 두번쨰 매개변수는 {키:값}
  res.render('index', {title: 'index페이지'})
});

// 단순한 그림파일을 화면에 표시하기 위해
// 일일이 라우팅 설정하는 것은 번거로움
// router.get("/switzerland.png", (req, res) => {
// // 응답으로 지정한 파일의 내용을 전송함
//   res.sendFile(path.join(__dirname, '../static/img', 'switzerland.png'));
// });

// module.exports를 사용하여 라우터 객체를 외부로 내보낸다
// 이렇게 함으로써, require() 함수를 사용하여 이 모듈을
// 다른 코드에서 로드할 수 있다
module.exports = router;
