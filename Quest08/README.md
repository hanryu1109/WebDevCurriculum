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
  > - GET: GET 메서드는 지정된 리소스의 표현을 요청합니다. 데이터를 읽거나(Read), 검색(Retrieve)할 때에 사용되는 method입니다.
  > - POST: POST 메서드는 엔터티를 지정된 리소스에 제출하여 종종 상태를 변경합니다. 리소스를 생성/업데이트하기 위해 서버에 데이터를 보내는 데 사용됩니다.
  - 다른 HTTP 메소드에는 무엇이 있나요?
    > - PUT: PUT 메서드는 대상 리소스의 모든 현재 표현을 요청 페이로드로 바꿉니다. (말이 이해 안됨...)
    > - PATCH: PATCH 방법은 리소스에 부분 수정을 적용합니다.
    > - OPTIONS: OPTIONS 메소드는 대상 자원에 대한 통신 옵션을 설명합니다.
    > - DELETE: DELETE 메서드는 지정된 리소스를 삭제합니다.
- HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?
  > -
  - HTTP 요청의 `Content-Type` 헤더는 무엇인가요?
    > - `Content-Type` 이란 HTTP 통신에서 전송되는 데이터의 타입을 나타내는 헤더 정보 중 하나입니다.
    > - `Content-Type` 에 따라 데이터를 받는 측에서는 데이터를 어떻게 처리해야 할 지 판단합니다.
    > - ex) text/html, image/gif ... (MIME 표준에 정의된 된 것을 사용합니다)
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
  - 그 밖에 서버가 요청들에 따라 공통적으로 처리하는 일에는 무엇이 있을까요? 이를 어떻게 정리하면 좋을까요?

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
