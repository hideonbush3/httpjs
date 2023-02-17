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
const dbconfig = require('../dbconfig')
const oracledb = require("oracledb");


// show index page
router.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '../public', 'index.html'));
  res.render("index", { title: "홈" });
});

router.get("/sungjuk", (req, res) => {
  res.render("sungjuk", { title: "성적처리" });
});

oracledb.initOracleClient({ libDir: "C:/JAVA/instantclient_19_17" });

router.post("/sungjuk", async (req, res, next) => {
  // 폼으로 전송된 데이터들은 req.body, req.body.폼이름
  console.log(req.body)
  // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat)

  let { name, kor, eng, mat } = req.body;
  kor = parseInt(kor)
  eng = parseInt(eng)
  mat = parseInt(mat)
  console.log(name, kor, eng, mat);

  // 성적처리 - 컨트롤러
  let [tot, avg, grd]   = [kor + eng + mat, ((kor + eng + mat) / 3), '가'];
  switch (Math.floor(avg / 10)) {
    case 10:grd = "수"; break;
    case 9:grd = "수"; break;
    case 8:grd = "우"; break;
    case 7:grd = "미"; break;
    case 6:grd = "양"; break;
  }
  console.log(tot, avg, grd);

  // 데이터베이스 처리  - sungjuk 테이블에 insert - 모델
  let sql =
    "insert into sungjuk (no, name, kor, eng, mat, tot, avg, grd) values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7)";
  let params = [name, kor, eng, mat, tot, avg, grd];

  let conn = null;
  try {
    conn = await oracledb.getConnection(dbconfig);
    await conn.execute(sql, params);
    await conn.commit(); // insert 할때 반드시 필요!
  } catch (ex) {
    console.error(ex);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (ex) {
        console.error(ex);
      }
    }
  }
  res.redirect(302, "/");
});

// module.exports를 사용하여 라우터 객체를 외부로 내보낸다
// 이렇게 함으로써, require() 함수를 사용하여 이 모듈을
// 다른 코드에서 로드할 수 있다
module.exports = router;
