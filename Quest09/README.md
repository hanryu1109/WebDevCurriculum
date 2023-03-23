# Quest 09. 서버와 클라이언트의 대화

## Introduction

- 이번 퀘스트에서는 서버와 클라이언트의 연동, 그리고 웹 API의 설계 방법론 중 하나인 REST에 대해 알아보겠습니다.

## Topics

- expressJS, fastify
- AJAX, `XMLHttpRequest`, `fetch()`
- REST, CRUD
- CORS

## Resources

- [Express Framework](http://expressjs.com/)
- [Fastify Framework](https://www.fastify.io/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [REST API Tutorial](https://restfulapi.net/)
- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
- [MDN - CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Checklist

- 비동기 프로그래밍이란 무엇인가요?

  > - 코드가 읽히는 순간 바로 바로 실행되는게 아니라 코드를 읽는 것과 실행하는게 분리된 프로그래밍입니다.

- 콜백을 통해 비동기적 작업을 할 때의 불편한 점은 무엇인가요? 콜백지옥이란 무엇인가요?

  > - 여러개의 비동기 처리가 서로 연관되어있다면 비동기의 실행순서가 보장되어야합니다. 이럴때 콜백함수를 이용하는데 콜백이 여러개 중첩되면 코드의 모양이 함수 내부의 콜백함수 내부의 콜백함수 내부의 이런식으로 보기 불편해지고 콜백지옥이라고 불리는 형태의 코드가 형성됩니다. 콜백지옥은 함수 내부로 들어가면 탭을 통해 뎁스가 생기는데 > 모양으로 코드가 변하기 때문에 콜백 지옥이라고 표현합니다.
  > - 콜백 지옥의 코드라고 불리는 이유는 코드의 가독성이 떨어지고, 유지보수가 힘들어지기 때문입니다.

- 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

  > - 자바스크립트의 Promise는 비동기 처리를 위한 객체입니다.
  > - 3가지의 상태를 가진 객체로써, 비동기 연산이 종료된 이후 값에 따른 처리를 메서드를 통해서 받을 수 있습니다.
  > - Promise 객체의 상태는 대기, 이행, 거부로 나뉩니다.
  > - 대기(pending): 이행하지도, 거부하지도 않은 초기상태.
  > - 이행(fulfilled): 연산이 성공적으로 완료되었으며 then 메소드 체인으로 값이 넘어가게 됩니다. (처리가 완료되면 Promise 객체를 생성할 때 받은 콜백에서 resolve라는 함수를 받아서 실행시킨다. resolve의 인자로 받아들여진 값은 Promise.then()을 통해 전달됩니다)
  >   거부(rejected): 연산이 실패했음을 의미하며, catch 메소드로 에러객체가 넘어가게 됩니다. (콜백에서 인자로 받은 reject라는 함수는 애러가 났을 때 실행하도록 코드를 작성하고 Promise.catch를 통해 전달됩니다.)

- 자바스크립트의 `async`와 `await` 키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

  > - Promise를 이용한 비동기처리도 .then과 catch를 계속해서 이어붙이므로 직관적이지 않고 콜백지옥처럼 코드의 가독성이 떨어지기 때문에 실제 동기적으로 처리되는 것처럼 보이게 하는 것이 `async`과 `await`입니다.
  > - 함수 앞에 `async`키워드를 붙이고 내부 에서 비동기 처리를 할 동작 앞에 `await`를 붙이게되면 코드 실행이 블로킹되고 해당 작업이 완료될때까지 기다린 뒤에 다음 코드를 처리합니다. `await` 키워드를 통하여 promise 값을 받아올 수 가 있습니다.
  > - `await` 키워드는 무조건 resolve가 된 값만 받아올 수 있기 때문에 async-await 구문안에서는 예외 처리를 할때 try-catch를 같이 사용합니다.

- 브라우저 내 스크립트에서 외부 리소스를 가져오려면 어떻게 해야 할까요?

> - 자바스크립트에 기본적으로 내장된 XMLHttpRequest, fetch를 이용해서 외부 리소스를 가지고 옵니다.

- 브라우저의 `XMLHttpRequest` 객체는 무엇이고 어떻게 동작하나요?

  > - fetch가 나오기 이전에 ajax요청을 할때 사용되었습니다.
  > - 현재의 Promise기반과는 달리 이벤트기반의 형식입니다.

  ```js
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://example.com/data.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log("Error: " + xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.log("Error: " + xhr.statusText);
  };
  xhr.send();
  ```

  > - 위 코드에서 xhr.open() 메서드는 서버와의 통신을 설정하고, xhr.onload() 메서드는 데이터가 로드되면 호출됩니다. xhr.onerror() 메서드는 로드 중 오류가 발생하면 호출됩니다.

- `fetch` API는 무엇이고 어떻게 동작하나요?

  > - `fetch` API는`XMLHttpRequest`과 동일하게 AJAX 통신을 위해 만들어진 메서드로 기존의 `XMLHttpRequest` 에 비해 사용성이 뛰어나고 promise객체를 반환하기 때문에 좀더 유연하게 동작합니다.

  ```js
  const res = fetch(url, option);
  res.then((e) => console.log(e));
  ```

  > - option에는 http 방식 과 헤더 바디 등 여러가지 정보를 설정 할수 있고 이렇게 해서 보내진 요청은 promise객체를 반환받는데 이때 `then` 체인을 이용해서 받아온 응답을 활용 할 수 있습니다.

- REST는 무엇인가요?

  > - 분산 시스템 설계를 위한 아키텍쳐 스타일
  > - 자원의 형태는 url로 표현하고 행위에 대한것은 HTTP 메소드로 표현

- REST API는 어떤 목적을 달성하기 위해 나왔고 어떤 장점을 가지고 있나요?

  > - REST API는 어떻게 하면 데이터를 명확하고 효율적으로 주고받을지를 고려하기 위해 만들어진 API이며 서버에 어떠한 동작을 요청할때 url을 보고 어떤 요청(CRUD)인지를 잘 알수 있어서 직관적인 장점이 있습니다.
  > - HTTP 프로토콜의 인프라를 그대로 사용하므로 별도의 인프라를 구축할 필요가 없습니다.

- RESTful한 API 설계의 단점은 무엇인가요?

  > - 이를 구현하려면 많은 규칙과 규약을 준수해야 합니다. 이는 API 설계와 구현의 복잡성을 증가시키고, 개발자들의 부담을 높일 수 있습니다.
  > - RESTful API는 클라이언트와 서버 간의 상태를 유지하지 않습니다. 이로 인해 각각의 요청은 모든 필요한 정보를 포함해야 하므로, 오버헤드가 발생할 수 있습니다.

- CORS란 무엇인가요? 이러한 기능이 왜 필요할까요? CORS는 어떻게 구현될까요?
  > - 브라우저는 SOP(same origin policy)를 지키고있으며, 같은 도메인의 서버에서만 데이터를 받아올수가 있습니다.
  > - 다른 출처의 자원도 교류하기위해서 나온 것이 CORS(cross origin resource)정책입니다.
  > - 브라우저는 요청을 날리기전에 preflight를 날려서 응답을 확인하게 되는데, 이에 따른 서버의 응답에서 헤더에 Access-control-allow-origin을 해당 클라이언트 도메인을 명시해주고, 허용가능한 http 메소드도 명시해줘야 합니다. (Access-control-allow-methods)

## Quest

- 이번 퀘스트는 Midterm에 해당하는 과제입니다. 분량이 제법 많으니 한 번 기능별로 세부 일정을 정해 보고, 과제 완수 후에 그 일정이 얼마나 지켜졌는지 스스로 한 번 돌아보세요.
  - 이번 퀘스트부터는 skeleton을 제공하지 않습니다!
- Quest 05에서 만든 메모장 시스템을 서버와 연동하는 어플리케이션으로 만들어 보겠습니다.
  - 클라이언트는 `fetch` API를 통해 서버와 통신합니다.
  - 서버는 8000번 포트에 REST API를 엔드포인트로 제공하여, 클라이언트의 요청에 응답합니다.
  - 클라이언트로부터 온 새 파일 저장, 삭제, 다른 이름으로 저장 등의 요청을 받아 서버의 로컬 파일시스템을 통해 저장되어야 합니다.
    - 서버에 어떤 식으로 저장하는 것이 좋을까요?
  - API 서버 외에, 클라이언트를 띄우기 위한 서버가 3000번 포트로 따로 떠서 API 서버와 서로 통신할 수 있어야 합니다.
  - Express나 Fastify 등의 프레임워크를 사용해도 무방합니다.
- 클라이언트 프로젝트와 서버 프로젝트 모두 `npm i`만으로 디펜던시를 설치하고 바로 실행될 수 있게 제출되어야 합니다.
- 이번 퀘스트부터는 앞의 퀘스트의 결과물에 의존적인 경우가 많습니다. 제출 폴더를 직접 만들어 제출해 보세요!

## Advanced

- `fetch` API는 구현할 수 없지만 `XMLHttpRequest`로는 구현할 수 있는 기능이 있을까요?
- REST 이전에는 HTTP API에 어떤 패러다임들이 있었을까요? REST의 대안으로는 어떤 것들이 제시되고 있을까요?
