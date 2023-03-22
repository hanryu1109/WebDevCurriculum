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

⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️

- Postman에서 POST 요청을 보내는 여러 가지 방법(`form-data`, `x-www-form-urlencoded`, `raw`, `binary`) 각각은 어떤 용도를 가지고 있나요?
  > - `form-data` 는 form을 채울때 입력 한 세부 정보와 같이 양숙 내부에 래핑하는 데이터를 보내는데 사용됩니다. 이러한 세부 정보는 Key가 보내는 항목의 "이름" 이고 Value는 실제 값을 입력하면 됩니다. 즉, Key-Value 쌍으로 작성하여 전송됩니다.
  >   (사진 또는 예시)
  > - `x-www-form-urlencoded` 는 `form-data` 와 매우 유사합니다. 둘 다 거의 동일한 목적으로 사용되지만 차이점은 URL이 x-www-form-urlencoded를 통해 전송 될 때 인코딩된다는 것입니다. 인코딩 된다는 뜻은 전송되는 데이터가 다른 문자로 인코딩되어 공격을 받고 있어도 인식할 수 없음을 의미합니다.
  >   (사진 또는 예시)
  > - `raw` POST 메서드에서 본문을 보내는 동안 가장 많이 사용되는 부분 또는 옵션입니다. Postman의 관점에서 중요합니다. Raw는 본문 메시지가 요청 본문을 나타내는 비트 스트림으로 표시됨을 의미합니다. 이러한 비트는 문자열 서버로 해석됩니다.
  >   (사진 또는 예시)
  > - `binary` 수동으로 입력할 수 없는 형식으로 데이터를 전송하도록 설계되었습니다. 컴퓨터의 모든 것이 바이너리로 변환되기 때문에 이미지, 파일 등과 같이 수동으로 작성할 수 없는 상황일 때 이러한 옵션을 사용합니다.
  >   (사진 또는 예시)
- node.js의 `http` 모듈을 통해 HTTP 요청을 처리할 때,

  - `req`와 `res` 객체에는 어떤 정보가 담겨있을까요?

    > - method: 클라이언트의 요청 방식을 나타냅니다.
    > - url: 클라이언트가 요청한 URL을 나타냅니다.
    > - headers: 요청 메시지 헤더를 나타냅니다.
    > - trailers: 요청 메시지 트레일러를 나타냅니다.
    > - httpVersion: HTTP 프로토콜 버전을 나타냅니다.

    > - writeHead: 응답 헤더를 작성합니다.
    > - end: 응답 본문을 작성합니다.

  - GET과 POST에 대한 처리 형태가 달라지는 이유는 무엇인가요?
    > - (예상) GET 은 데이터에 대한 변화가 없지만 POST 는 데이터 변화가 일어나기 때문에 어떤 데이터를 어떻게 바꿀 것인지에 대한 추가 정보가 들어가야 하니깐 처리 형태가 달라지는 것이 아닐까?

- 만약 API 엔드포인트(URL)가 아주 많다고 한다면, HTTP POST 요청의 `Content-Type` 헤더에 따라 다른 방식으로 동작하는 서버를 어떻게 정리하면 좋을까요?
  > - `Content-Type` 에 따라 요청을 파일별로 분리하는 것이 좋을 것 같아요....
  - 그 밖에 서버가 요청들에 따라 공통적으로 처리하는 일에는 무엇이 있을까요? 이를 어떻게 정리하면 좋을까요?
    > - util 폴더를 만들어서 공통적으로 자주 사용하는 처리에 대한 것을 따로 모아놓으면 좋을 것 같아요.

## Quest

- 다음의 동작을 하는 서버를 만들어 보세요.
  - 브라우저의 주소창에 `http://localhost:8080`을 치면 `Hello World!`를 응답하여 브라우저에 출력합니다.
  - 서버의 `/foo` URL에 `bar` 변수로 임의의 문자열을 GET 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  - 서버의 `/foo` URL에 `bar` 키에 임의의 문자열 값을 갖는 JSON 객체를 POST 메소드로 보내면, `Hello, [문자열]`을 출력합니다.
  - 서버의 `/pic/upload` URL에 그림 파일을 POST 하면 서버에 보안상 적절한 방법으로 파일이 업로드 됩니다.
  - 서버의 `/pic/show` URL을 GET 하면 브라우저에 위에 업로드한 그림이 뜹니다.
  - 서버의 `/pic/download` URL을 GET 하면 브라우저에 위에 업로드한 그림이 `pic.jpg`라는 이름으로 다운로드 됩니다.
- expressJS와 같은 외부 프레임워크를 사용하지 않고, node.js의 기본 모듈만을 사용해서 만들어 보세요.
- 처리하는 요청의 종류에 따라 공통적으로 나타나는 코드를 정리해 보세요.

## Advanced

- 서버가 파일 업로드를 지원할 때 보안상 주의할 점에는 무엇이 있을까요?

https://pygmalion0220.tistory.com/entry/HTTP-Content-Type
