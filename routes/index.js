const express = require("express");
const router = express.Router();
const path = require("path");

// show index page
router.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '../public', 'index.html'));

  // handlebars 뷰 엔진으로 응답처리
  // render의 매개변수는 두개다
  // 첫번째는 layout.hbs의 body에 들어갈 hbs 파일명,
  // 두번째는 layout.hbs에 지정해놓은 키와 값 - {키:값} 형식
  res.render('index', {title: 'index페이지'})
});


router.get("/sungjuk", (req, res) => {
  res.render('sungjuk', {title: '성적처리'})
});

router.post("/sungjuk", (req, res, next) => {
  // 폼ㅇ로 전송된 데이터들은 req.body, req.body.폼이름
  // console.log(req.body)
  // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat)

  let {name, kor, eng, mat} = req.body;
  console.log(name, kor, eng, mat);

  // 성적처리
  let [tot, avg, grd] = [parseInt(kor+eng+mat), (kor+eng+mat)/3, '가'];
  console.log(tot, avg, grd);

  // 데이터베이스 처리  - sungjuk 테이블에 insert


  res.redirect(304, '/');
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
