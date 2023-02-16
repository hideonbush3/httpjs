const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const aboutRouter = require("./routes/about.js");
const path = require("path");
const logger = require("morgan"); // 로그 출력기
const bodyParser = require('body-parser');  // 폼 처리기

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

// express-handlebars 패키지에서 제공하는 engine 속성을 가져오는 것
// engine 속성은 메서드임
// { 속성명 } - 구조분해할당 형식
const { engine } = require("express-handlebars");

// view 템플릿 엔진 등록
// express 애플리케이션의 사용할 뷰 엔진을 등록하는 메서드 engine
// handlebars 패키지에서 가져온 engine 메서드와는 다름
// 첫번째 매개변수는 템플릿 엔진의 이름
// 두번째 매개변수는 템플릿 엔진의 옵션
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout",
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
    },
  })
);

app.set("views", path.join(__dirname, "views"));
// Express 애플리케이션에서 사용할 뷰 엔진을 설정
// hbs"는 Handlebars.js 뷰 엔진을 사용한다는 것을 의미
// 이를 통해 express는 브라우저에 html 파일을 랜더링할때 .hbs 확장자를
// 가진 파일을 handlebars.js 엔진을 사용하여 처리함
app.set("view engine", "hbs");

// static 폴더 안에 있는 파일을 라우팅 없이 바로 호출할 수 있도록 설정한다
// localhost:3000/img/switzerland.png
// __dirname은 현재 실행중인 스크립트 파일의 디렉토리 경로를 뜻함
// 여기선 Users\ASUS\Documents\https 라는 문자열 값을 가짐
app.use(express.static(path.join(__dirname, "static")));

// 로그 설정
app.use(logger("dev"));

// 미들웨어 등록 및 설정
app.use(express.json());
// 전송된 폼 데이터에 대한 urlencoding 설정
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())   // 전송된 폼 데이터는 json 형식
// enctype이 text/plain 일때 필요 (비추)
// app.use(bodyParser.text())


// index에 대한 route handler 지정
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);

// 404 처리
app.use((req, res) => {
  // use 메서드에서 경로 설정하지 않으면 웹 페이지에서 경로를 잘못 입력한 경우 여기 도달함
  res.status(404);
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

// 500 처리
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.sendFile(path.join(__dirname, "public", "500.html"));
});

app.listen(port, () => {
  console.log("express 서버 실행중. 중지하려면 ctrl + c");
});
