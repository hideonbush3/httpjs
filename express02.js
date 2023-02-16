const express = require("express");
const port = process.env.PORT || 3000;
const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");
const aboutRouter = require("./routes/about.js");

// 서버 애플리케이션 객체 생성
const app = express();

// index에 대한 route handler 지정
app.use("/", indexRouter);

app.use("/user", userRouter);
app.use("/about", aboutRouter);

app.listen(port, () => {
  console.log("express 서버 실행중. 중지하려면 ctrl + c");
});
