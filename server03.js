const http = require("http");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000; // 실행하고 주소창에 127.0.0.1:3000/ 또는 localhost:3000/ 입력

const html = "text/html; charset=utf-8";

// 요청에 대한 정적파일을 서비스하는 함수
// 비동기적으로 파일 읽기 fs.readFile(파일명, 콜백함수)
// 콜백함수의 첫번째 매개변수는 오류객체이고 두번째 매개변수는 원하는값
function serveStaticFile(res, fname) {
  fs.readFile(path.join(__dirname, "public", fname), (err, data) => {
    // 지정한 경로의 파일을 정상적으로 읽고 data 변수에 넣는다
    //에러 발생시에는 err 변수에 넣는다
    if (err) {
      // 파일을 읽다가 오류가 발생했다면
      // 응답코드 500 전송 후 오류메시지 출력
      res.writeHead(500, { "Content-Type": html });
      return res.end("<h1>파일처리중 오류발생!!</h1>");
    }
    res.writeHead(200, { "Content-Type": html });
    res.end(data);
  });
}
// localhost:3000 요청시, 요청 path별 처리 세분화 - routing
// 요청 path: /
// 요청 path: /user
// 요청 path: /about
// 그외 나머지: 404 - 페이지없음

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      serveStaticFile(res, "index.html");
      break;
    case "/user":
      serveStaticFile(res, "user.html");
      break;
    case "/about":
      serveStaticFile(res, "about.html");
      break;
    case "/500": // 의도적으로 오류를 발생시켜봄
      serveStaticFile(res, "500.html");
      break;
    default:
      serveStaticFile(res, "404.html");
  }
});

server.listen(port, () => {
  console.log("서버실행중... 중지하려면 ctrl+c를 눌러요!");
});
