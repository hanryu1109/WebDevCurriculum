import http from "http";
import url from "url";
import fs from "fs";
import path from "path";

const port = 8080;

const server = http.createServer((req, res) => {
  /* TODO: 각각의 URL들을 어떻게 처리하면 좋을까요? */
  /* createServer의 콜백함수에서 req.url 을 통해 URL을 확인하여 각각의 URL에 대응하는 응답을 처리하면 좋을 것 같습니다.  */

  const parsedUrl = url.parse(req.url);
  const pathName = parsedUrl.pathname;

  if (req.method === "GET" && pathName === "/") {
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!!!\n");

    return;
  }

  if (req.method === "GET" && pathName === "/foo") {
    const queryString = url.parse(req.url, true).query;
    const string = queryString.bar ? queryString.bar : "";

    res.setHeader("Content-Type", "text/html");
    res.end(`Hello, ${string}\n`);

    return;
  }

  if (req.method === "POST" && pathName === "/foo") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const { bar } = JSON.parse(body);
      const message = `Hello, ${bar ? bar : "stranger"}`;

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

  if (req.method === "POST" && pathName === "/pic/upload") {
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

  if (req.method === "GET" && pathName === "/pic/show") {
    const filePath = path.join(__dirname, "pic.jpg");
    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);
    //
  }

  if (req.method === "GET" && pathName === "/pic/download") {
    //
  }

  res.statusCode = 404;
  res.end();
});

server.listen(port);
