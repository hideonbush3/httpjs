// Node.js의 내장모듈 http - HTTP 서버 생성할때 사용
const http = require("http");

// 환경 변수(process.env)에 설정된 포트가 있으면 해당 포트를
// 사용하고, 없다면 3000번 포트를 사용하도록 지정
const port = process.env.PORT || 3000;

// createServer 함수로 서버 객체를 생성
// 이 함수는 콜백 함수를 매개변수로 받으며,
// 이 콜백 함수는 요청(request)이 있을 때마다 실행
const server = http.createServer((req, res) => {

  // writeHead 메서드를 사용하여 응답 헤더 작성
  // 응답코드, 응답 데이터 형식 지정
  // writeHead 메서드는
  // HTTP 상태코드와 HTTP 응답 본문의 데이터 형식(MIME 타입)을 매개변수로 받음
  // MIME 타입은 브라우저에서 데이터를 해석하는 방법을 결정
  res.writeHead(200, { "Content-Type": "text/plain" });

  // end 메서드를 사용해서 응답을 종료
  res.end("hello, World");
});

// listen 메서드를 사용해 서버를 시작하고
// 포트가 바인딩되었다는 메시지를 콘솔에 출력
server.listen(port, () => {
  console.log("서버실행중... 중지하려면 ctrl+c를 눌러요!");
});
