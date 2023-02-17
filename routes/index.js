// create table sungjuk (
//     no number(6),
//     name varchar(100) not null,
//     kor number(3) not null,
//     eng number(3) not null,
//     mat number(3) not null,
//     tot number(3) not null,
//     avg number(5,1) not null,
//     grd varchar(10) not null,
//     regdate date default current_timestamp,
//     primary key (no)
// );
//
// create sequence sjno;
// select * from sungjuk order by no;
// select SEQUENCE_NAME, last_number from USER_SEQUENCES;

const express = require("express");
const router = express.Router();
const path = require("path");
const SungJuk = require("../models/Sungjuk");

// show index page
router.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '../public', 'index.html'));
  res.render("index", { title: "홈" });
});

// 성적처리
router.get("/sungjuk", (req, res) => {
  res.render("sungjuk", { title: "성적처리" });
});
router.post("/sungjuk", (req, res, next) => {
  // 폼으로 전송된 데이터들은 req.body, req.body.폼이름
  // console.log(req.body);
  // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat)

  let { name, kor, eng, mat } = req.body;
  kor = parseInt(kor);
  eng = parseInt(eng);
  mat = parseInt(mat);
  console.log(name, kor, eng, mat);

  // 성적처리
  let [tot, avg, grd] = [kor + eng + mat, (kor + eng + mat) / 3, "가"];
  if (avg >= 90) grd = "수";
  else if (avg >= 80) grd = "우";
  else if (avg >= 70) grd = "미";
  else if (avg >= 60) grd = "양";
  console.log(tot, avg, grd);

  // 데이터베이스 처리  - sungjuk 테이블에 insert - 모델
  new SungJuk(name, kor, eng, mat, tot, avg, grd).insert();
  res.redirect(302, "/");
});

router.get("/showsungjuk", async (req, res) => {
  let sjs = new SungJuk().select().then(async (result) => {
    return await result;
  });
  console.log(await sjs);

  res.render("showsungjuk", { title: "성적전체보기", sjs: await sjs });
});

router.get("/viewsungjuk", async (req, res) => {
  let sjno = req.query.sjno; // queryString의 매개변수 추출

  let sjs = new SungJuk().selectOne(sjno).then(async result => {
    return await result;
  });
  console.log(await sjs);

  res.render("viewsungjuk",
      { title: "성적상세보기", sjs: await sjs });
});

// module.exports를 사용하여 라우터 객체를 외부로 내보낸다
// 이렇게 함으로써, require() 함수를 사용하여 이 모듈을
// 다른 코드에서 로드할 수 있다
module.exports = router;
