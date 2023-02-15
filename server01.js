const http = require("http");
const port = process.env.PORT || 3000; // 실행하고 주소창에 127.0.0.1:3000/ 또는 localhost:3000/ 입력

// localhost:3000요청시 처리
const server = http.createServer((req, res) => {
  // 응답헤더 작성 : 응답코드, 응답 데이터 형식 지정
  res.writeHead(200, { "Content-Type": "text/plain" }); // 정보가 기록되는 헤더
  res.end("hello, World");  // 응답 종료 메서드인데
});

server.listen(port, () => {
  console.log("서버실행중... 중지하려면 ctrl+c를 눌러요!");
});
