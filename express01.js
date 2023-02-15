const express = require("express");
const port = process.env.PORT || 3000;
const html = "text/html; charset=utf-8";

// 서버 애플리케이션 객체 생성
const app = express();

// 라우팅 설정 : 서버객체명.요청메서드(경로, 콜백함수)
app.get("/", (req, res) => {
  res.type(html);
  res.end("<h1>index 페이지 입니다!!</h1>");
});

app.get("/user", (req, res) => {
  res.type(html);
  res.end("<h1>user 페이지 입니다!!</h1>");
});

// routing path 추가분 - 파일이 복잡해짐!
app.get("/user/add", (req, res) => {
  res.type(html);
  res.end("<h1>user 가입 페이지 입니다!!</h1>");
});

app.get("/user/view", (req, res) => {
  res.type(html);
  res.end("<h1>user 상세페이지 입니다!!</h1>");
});

app.get("/about", (req, res) => {
  res.type(html);
  res.end("<h1>about 페이지 입니다!!</h1>");
});

// custom 404 routing
// 라우팅 설정 2 : app.use(경로, 콜백함수) - 요청이 왔을때 실행할 함수를 지정
app.use((req, res) => {
  // use 메서드에서 경로 설정하지 않으면 웹 페이지에서 경로를 입력하지 않은 경우 여기 도달함
  res.type(html);
  res.status(404);
  res.end("<h1>404 - 존재하지 않는 페이지</h1>");
});

app.listen(port, () => {
  console.log("express 서버 실행중. 중지하려면 ctrl + c");
});
