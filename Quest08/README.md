# Quest 08. 웹 API의 기초

## Introduction

- 이번 퀘스트에서는 웹 API 서버의 기초를 알아보겠습니다.

## Topics

- HTTP Method
- node.js `http` module
  - `req`와 `res` 객체

## Resources

- [MDN - Content-Type Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
- [MDN - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN - MIME Type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)
- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- [HTTP Node.js Manual & Documentation](https://nodejs.org/api/http.html)

## Checklist

- HTTP의 GET과 POST 메소드는 어떻게 다른가요?

  > - GET: GET 메서드는 지정된 리소스의 표현을 요청합니다. 데이터를 가져올 때만 사용해야 합니다.
  >
  > 1. GET 을 통한 요청은 URL 주소 끝에 파라미터로 포함되어 전송: 쿼리 스트링(query string)
  > 2. 캐시가 가능합니다. GET 메서드를 이용해 서버에 리소스를 요청할 때 웹 캐시가 요청을 가로채서 서버로부터 리소스를 다시 다운로드 하는 대신 리소스의 복사본을 반환합니다. HTTP 헤더에서 cache-control 헤더를 통해 캐시 옵션을 지정할 수 있습니다.
  > 3. 브라우저 히스토리에 남습니다.
  > 4. 중요한 정보를 다루면 안됩니다. GET 요청시 파라미터에 노출되기 때문입니다.
  >
  > - POST: POST 메서드는 엔터티를 지정된 리소스에 제출하여 종종 상태를 변경합니다. 리소스를 생성/업데이트하기 위해 서버에 데이터를 전송하는 데 사용됩니다.
  >
  > 1. POST 메서드는 전송할 데이털르 HTTP 메세지 본문(body)에 담아서 서버로 보닙니다. body의 타입은 `Content-Type` 헤더에 따라 결정됩니다.
  > 2. 캐시되지 않습니다.
  > 3. 브라우저 히스토리에 남지 않습니다.
  > 4. 멱등성이 보장되지 않습니다.(동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때, 해당 HTTP 메서드가 **멱등성**을 가졌다고 말할 수 있습니다)

  - 다른 HTTP 메소드에는 무엇이 있나요?

        > - HEAD: 특정 리소스를 `GET` 메서드로 요청했을 때 돌아올 헤더를 요청합니다. `HEAD` 메서드에 대한 응답은 본문을 가져선 안되며, 본문이 존재하더라도 무시해야합니다.
        > - PUT: `PUT` 메서드는 요청된 자원을 수정(UPDATE)합니다. 멱등성을 가집니다. `PUT`은 한 번을 보내도, 여러 번을 연속으로 보내도 같은 효과를 보입니다.
        > - PATCH: `PATCH` 방법은 리소스에 부분 수정을 적용합니다. `PATCH`는 `PUT`과 달리 멱등성을 가지지 않습니다. 이는 동일한 patch 요청이 다른 결과를 야기할 수도 있음을 뜻합니다.
        > - OPTIONS: `OPTIONS` 메서드는 서버와 브라우저가 통신하기 위한 통신 옵션을 확인하기 위해 사용합니다. 서버가 어떤 method, header, Content-Type을 지원하는지 알 수 있습니다. 브라우저가 요청할 메서드와 헤더를 허용하는지 미리 확인한 후, 서버가 지원할 경우에 통신합니다.(preflight: 브라우저가 서버와 통신하기 이전에 해당 서버의 옵션들을 확인하기 위한 요청)
        > - DELETE: `DELETE` 메서드는 지정된 리소스를 삭제합니다.
        > - CONNECT: `CONNECT` 메서드는 요청한 리소스에 대해 양방향 연결을 시작하는 메소드입니다. 터널을 열기 위해서 사용됩니다. 프록시에 터널 접속 확립을 요청합니다. TCP 통신을 터널링 시키기 위해서 사용됩니다. 주로 SSL과 TLS등의 프로토콜로 암호화된 것을 터널링 시키기 위해서 사용하고 있습니다.
        > - TRACE: `TRACE` 메서드는 Client - Server Side 간 Look back 테스트를 진행할 수 있게 도와줍니다. 자신의 요청이 서버에 도달했을 때 어떻게 보이게 되는지 알려줍니다. 주로 진단을 위해 디버깅용도로 사용됩니다. 리퀘스트를 보낸곳에 어떤 리퀘스트가 가공 되어있는지 등을 조사할 수 있으나 거의 사용되지 않으며, 크로스 사이트 트레이싱(XST)와 같은 공격을 일으키는 보안상 문제로 인하여 보통 사용되고 있지 않습니다.

- HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?
  > - `GET` 은 URL에 데이터를 붙여서 요청하는 반면 `POST`는 본문(body)에다가 데이터를 넣어서 보내게 됩니다.
- HTTP 요청의 `Content-Type` 헤더는 무엇인가요?

  > - `Content-Type` 이란 HTTP 통신에서 전송되는 데이터의 타입을 나타내는 헤더 정보 중 하나입니다.
  > - `Content-Type` 에 따라 데이터를 받는 측에서는 데이터를 어떻게 처리해야 할 지 판단합니다.
  > - ex) text/html, image/gif ... (MIME 표준에 정의된 된 것을 사용합니다)

- Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?
  > - `form-data` 는 양식을 채울 때 입력 한 세부 정보와 같이 양숙 내부에 래핑하는 데이터를 보내는데 사용됩니다. 이러한 세부 정보는 Key가 보내는 항목의 "이름" 이고 Value는 실제 값을 입력하면 됩니다. 즉, Key-Value 쌍으로 작성하여 전송됩니다.
  > - 파일 업르도와 같은 복잡한 작업에 잘 어울린다.
  > - 키 - 값의 쌍으로 정보를 보낼때 각각 다른 데이터타입을 가진경우(파일,텍스트)에 사용한다.
  >   (사진 또는 예시)
  > - `x-www-form-urlencoded`: `form-data` 와 매우 유사합니다. 둘 다 거의 동일한 목적으로 사용되지만 차이점은 URL이 `x-www-form-urlencoded`를 통해 전송 될 때 인코딩된다는 것입니다. 인코딩 된다는 뜻은 전송되는 데이터가 다른 문자로 인코딩되어 공격을 받고 있어도 인식할 수 없음을 의미합니다. 폼 데이터를 전송하는 간단한 경우에 적합하며 키 - 값의 쌍으로 url 인코딩된 값을 전송할때 사용합니다.
  >   (사진 또는 예시)
  > - `raw`: 텍스트로 입력할 수 있는 모든 것을 보내는데 `raw` body 데이터를 사용할 수 있습니다. 주로 JSON, XML 형식의 데이터를 전송하는 경우에 적합합니다. 데이터 유형을 선택하면 Postman에서 구문 강조를 활성화하고 관련 헤더를 요청에 추가합니다.
  >   (사진)
  > - `binary`: 이진 데이터를 사용하여 이미지, 오디오 및 비디오 파일과 같이 수동으로 입력할 수 없는 상황일 때 이러한 옵션을 사용합니다.
  >   (사진)
- node.js의 `http` 모듈을 통해 HTTP 요청을 처리할 때,

  - `req`와 `res` 객체에는 어떤 정보가 담겨있을까요?

    > - method: 클라이언트의 요청 방식을 나타냅니다.
    > - url: 클라이언트가 요청한 URL을 나타냅니다.
    > - headers: 요청 메시지 헤더를 나타냅니다.
    > - trailers: 요청 메시지 트레일러를 나타냅니다.
    > - httpVersion: HTTP 프로토콜 버전을 나타냅니다.

    > - `res` 객체에는 여러 method 가 있습니다.
    > - writeHead: 응답 헤더를 작성합니다.
    > - end: 응답 본문을 작성합니다.

  - GET과 POST에 대한 처리 형태가 달라지는 이유는 무엇인가요?

    > - `GET` 요청은 서버의 데이터에 대한 변화가 없지만 `POST` 요청은 데이터 변화가 일어나기 때문에 어떤 데이터를 어떻게 바꿀 것인지에 대한 추가 정보가 들어가야 하니깐 처리 형태가 달라집니다.
    > - 즉, HTTP 요청 중 `GET`과 `POST`는 서로 다른 목적과 특성을 가지고 있기 때문에 처리 형태가 달라지게 됩니다.
    > - `GET` 요청은 서버로부터 리소스를 조회하기 위한 요청이며, 주로 URL에 파라미터로 추가하여 서버로 전달합니다. http 모듈에서 GET 요청을 처리할 때는 URL 모듈을 사용하여 요청 URL을 파싱하고, 쿼리스트링에서 파라미터를 추출하여 처리합니다.

    ```js
    const http = require("http");
    const url = require("url"); // 또는 url 모듈에서 제공하는 URLSearchParams 이용

    http.createServer((request, response) => {
      const query = url.parse(request.url, true).query;
    });
    ```

    > - `POST` 요청은 서버로 데이터를 제출하기 위한 요청입니다. `POST` 요청은 `GET` 요청과는 달리 HTTP 요청 바디에 데이터를 담아 전송합니다. 이러한 `POST` 요청은 보안적인 이유로 캐시되지 않으며, 사용자가 입력한 정보 등 중요한 데이터를 전송할 때 사용됩니다. http 모듈에서 POST 요청을 처리할 때는 data 이벤트와 end 이벤트를 이용하여 요청 바디를 파싱하고, 처리합니다.

    ```js
    const http = require("http");

    http.createServer((request, response) => {
      const chunks = [];
      request.on("data", (chunk) => {
        chunks.push(chunk);
      });

      request.on("end", () => {
        console.log("all parts/chunks have arrived");
        const data = Buffer.concat(chunks);
        console.log("Data: ", data);
      });
    });
    ```

    [참고문헌](https://frontendguruji.com/blog/how-to-parse-post-request-in-node-js-without-expressjs-body-parser/)

- 만약 API 엔드포인트(URL)가 아주 많다고 한다면, HTTP POST 요청의 `Content-Type` 헤더에 따라 다른 방식으로 동작하는 서버를 어떻게 정리하면 좋을까요?
  > - 제 생각으로는 우선 `Content-Type` 에 따라 먼저 api 요청을 나눈 다음(ex. api/users/json,api/users/xml ... 이런식으로) API 정리를 하는 방법이 있을 것 같습니다.
  - 그 밖에 서버가 요청들에 따라 공통적으로 처리하는 일에는 무엇이 있을까요? 이를 어떻게 정리하면 좋을까요?
    > - 각각의 요청 안에서 공통적으로 처리해야 하는 일에는,
    > - `GET` 요청이 들어오면 서버에서는 url을 파싱하고, 쿼리를 파싱하는 일이 공통적으로 발생합니다.
    > - `POST` 요청이 들어오면 요청 본문을 파싱하는 일들이 공통적으로 발생합니다.
    > - 메서드에 상관없이 클라이언트가 접근 가능한 리소스인지를 확인하는 작업이 필요할 수 있습니다.
    > - 어떤 요청이냐에 상관없이 요청에 대한 처리 중 에러가 발생할 경우, 적절한 에러 메세지를 골라 클라이언트에게 전달해야 하기 때문에 서버는 적절한 에러 처리를 구현해야 합니다.
    > - XSS 공격 등의 보안 문제를 방지하기 위해 적절한 보안 처리를 해야합니다.

## Quest

- 다음의 동작을 하는 서버를 만들어 보세요.
  - [x] 브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력합니다.
  - [x] 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  - 서버의 `/foo` URL에 `bar` 키에 임의의 문자열 값을 갖는 JSON 객체를 POST 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  - 서버의 `/pic/upload` URL에 그림 파일을 POST 하면 서버에 보안상 적절한 방법으로 파일이 업로드 됩니다.
  - 서버의 `/pic/show` URL을 GET 하면 브라우저에 위에 업로드한 그림이 뜹니다.
  - 서버의 `/pic/download` URL을 GET 하면 브라우저에 위에 업로드한 그림이 `pic.jpg`라는 이름으로 다운로드 됩니다.
- expressJS와 같은 외부 프레임워크를 사용하지 않고, node.js의 기본 모듈만을 사용해서 만들어 보세요.
- 처리하는 요청의 종류에 따라 공통적으로 나타나는 코드를 정리해 보세요.

## Advanced

- 서버가 파일 업로드를 지원할 때 보안상 주의할 점에는 무엇이 있을까요?

https://pygmalion0220.tistory.com/entry/HTTP-Content-Type
