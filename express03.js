const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const aboutRouter = require("./routes/about.js");
const path = require("path");
const logger = require("morgan"); // 로그 출력기

const express = require("express");
const port = process.env.PORT || 3000;
// 서버 애플리케이션 객체 생성
const app = express();

// static 폴더 안에 있는 파일은 라우팅을 거치지 않고 직접 호출해서 응답
// http://127.0.0.1:3000/img/smile.png
app.use(express.static(path.join(__dirname, "static")));

// 로그 설정
app.use(logger("dev"));

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
  res.status(500);
  res.sendFile(path.join(__dirname, "public", "500.html"));
});

app.listen(port, () => {
  console.log("express 서버 실행중. 중지하려면 ctrl + c");
});
