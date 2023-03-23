import http from "http";

const port = 8080;

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  /* createServer의 콜백함수에서 req.url 을 통해 URL을 확인하여 각각의 URL에 대응하는 응답을 처리하면 좋을 것 같습니다.  */
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, World!!!\n");
});

server.listen(port);
