import http from "http";
import url from "url";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  /* createServer의 콜백함수에서 req.url 을 통해 URL을 확인하여 각각의 URL에 대응하는 응답을 처리하면 좋을 것 같습니다.  */

  const parsedUrl = url.parse(req.url).pathname;
  const parsedUrlList = parsedUrl.split("/");
  console.log(parsedUrlList);

  if (req.method === "GET" && parsedUrlList[1] === "") {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!!!\n");

    return;
  }

  if (parsedUrlList[1] === "foo") {
    if (req.method === "GET") {
      const queryString = url.parse(req.url, true).query;
      const string = queryString.bar || "Stranger"; // ??(Nullish coalescing operator, 널 병합 연산자): 널 병합 연산자는 첫 번째 연산자가 "널과 유사"한, 즉 null이거나 undefined일 때만 두 번째 피연산자를 반환합니다. ''와 0도 유효한 값이라면 널 병합 연산자가 기본 값을 나타낼 때 더 좋은 선택지입니다.

      res.setHeader("Content-Type", "text/html");
      res.end(`Hello, ${string}\n`);

      return;
    }

    if (req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const { bar } = JSON.parse(body);
        const message = `Hello, ${bar || "stranger"}`;

        res.writeHead(200, {
          "Content-Type": [
            "text/plain",
            "multipart/form-data",
            "application/json",
          ],
        });
        res.end(message);
      });

      return;
    }
  }

  if (parsedUrlList[1] === "pic") {
    if (req.method === "POST" && parsedUrlList[2] === "upload") {
      const fileName = "pic.jpg";
      const filePath = path.join(__dirname, fileName);
      const fileStream = fs.createWriteStream(filePath);

      req.pipe(fileStream);
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File uploaded successfully");
      });

      return;
    }

    if (req.method === "GET" && parsedUrlList[2] === "show") {
      const filePath = path.join(__dirname, "pic.jpg");
      const readStream = fs.createReadStream(filePath);

      readStream.pipe(res);
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File uploaded successfully");
      });
      return;
    }

    if (req.method === "GET" && parsedUrlList[2] === "download") {
      const filePath = path.join(__dirname, "pic.jpg");
      const readStream = fs.createReadStream(filePath);
    }
  }

  res.statusCode = 404;
  res.end();
});

const PORT = 8080;

server.listen(PORT);
