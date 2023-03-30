# Quest 12. 보안의 기초

## Introduction

- 이번 퀘스트에서는 가장 기초적인 웹 서비스 보안에 대해 알아보겠습니다.

## Topics

- XSS, CSRF, SQL Injection
- HTTPS, TLS

## Resources

- [The Basics of Web Application Security](https://martinfowler.com/articles/web-security-basics.html)
- [Website Security 101](https://spyrestudios.com/web-security-101/)
- [Web Security Fundamentals](https://www.shopify.com.ng/partners/blog/w ㅍeb-security-2018)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Wikipedia - TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)

## Checklist

- 입력 데이터의 Validation을 웹 프론트엔드에서 했더라도 서버에서 또 해야 할까요? 그 이유는 무엇일까요?
  > - Validation이란 뭐야? 우리는 유효성 검사라고도 하는데(이 내용맞는지 확인하기) 데이터의 유효성/신뢰도/위변조 여부 등 매우 넒은 범위를 포함
  > - 보통 client validation과 server의 validation을 나누는 것일까?
  > - client: 값이 비었는가(비밀번호가 입력이 안되면 로그인 버튼이 비활성화 된다던가 뭐 그런거)? Data type이 일치하는가(이메일 타입인지 아닌지, 비밀번호 형식이 맞는지 아닌지, 비밀번호 확인이 일치하는지)? 보통 프론트엔드 유효성 검사는 1. 유저의 입력값에 대한 유효성 검증, 2. 서버로부터 받아온 값이 사용자에게 그대로 노출 가능한 상태인지의 유효성(예시가 뭐가 있지?, 서버에서 받은 데이터가 프론트에서 이해가 어려운 경우라면 별도의 처리 작업 필요), 3. 타입 에러로 프로그램을 중단시키는 에러를 막는 유효성(예시가 뭐가 있지?)
  > - server: 값이 위/변조 되었는가? 유효한 값인가? 신뢰할 수 있는가?
  > - 왜 서버에서 또 validation을 해줘야 할까?
  > - 프론트의 유효성 검사는 쉽게 무력화될 수 있다? 이 말의 의미는?
  > - 개발자 도구 같은 것을 이용해서 값들을 변경하다보니, 유효성 검증은 DB에 저장되기 전에 서버에서 유효성 검사를 하는 것이 안전하다.
  > - 그렇다면 왜 클라이언트에서 해주나? 그냥 바로 서버에서 해주면 안되나? 라는 생각이 드는데
  > - 프론트에서 최대한 성공 케이스만 서버로 보내주는 것만으로도 서버가 받아야 할 콜 수를 줄일 수 있습니다.
  > - 프론트에서 보낸 유효성이 통과하여 백엔드로 넘어갔는데 유효성 검사를 통과하지 못하면 데이터를 저장하지 않고 프론트 측에 오류 메세지를 전달합니다.
  - 서버로부터 받은 HTML 내용을 그대로 검증 없이 프론트엔드에 innerHTML 등을 통해 적용하면 어떤 문제점이 있을까요?
    > - `innerHTML` 속성은 문자열 자체를 수정할 수 있기 때문에 악의를 가진 해커가 `<script>` 태그를 사용해 JavaScript 코드를 작성한 뒤 실행되도록 만들 수 있습니다.
    > - 그래서 어떤 데이터에 접근이 가능할 수 있고(다른 사용자의 정보를 훔쳐볼 수 있고) 그러면 사용자의 정보가 노출될 위험성이 있습니다.
  - XSS(Cross-site scripting)이란 어떤 공격기법일까요?
    > - 사이트간 스크립팅(또는 크로스 사이트 스크립팅)은 웹 사이트 관리자가 아닌 사람이 웹페이지에 악성 스크립트를 삽입할 수 있는 취약점입니다.
    > - 스크립트 내용에 따라 다르겠지만 쿠키나 세션 토큰 등의 탈취가 가능해서, 이를 인증이나 세션 관리에 사용하고 있는 사이트에 침입하거나 심각한 피해를 입힐 수 있습니다.
    > - 악의적으로 다른 사이트에서의 데이터를 탈취하기 위해, 정보를 훔쳐오기 위한 로직(script)을 server-side에 작성하는 행위입니다.
    > - 종류가 여러가지 입니다. Stored XSS(server side script에 행위 logic을 넣어 공격하는 방법이다.), Reflected XSS(URL parameter(querystring)에 행위 logic을 넣어 공격하는 방법이다.)
  - CSRF(Cross-site request forgery)이란 어떤 공격기법일까요?
    > - 직역하면 사이트 간 요청 위조의 줄임말입니다. 공격자가 희생자의 권한을 도용하여 특정 웹 사이트의 기능을 실행하게 할 수 있습니다.
    > - CSRF 이루어지는 과정
    > - 1. (희생자가 특정 사이트에 로그인된 상태) 희생자가 피싱 사이트에 접속
    > - 2. 피싱 사이트에서 위조된 요청을 전송
    > - 3. 희생자가 의도하지 않은 행동 실행(광고글 작성)
    > - 어떻게 대응할 수 있을까? 1. CHPTCHA(이미지를 보여주고 그 이미지에 해당하는 문자/숫자/그림이 아니라면 요청을 거부)
  - SQL Injection이란 어떤 공격기법일까요?
    > - SQL 구문으로 인한 감염을 의미합니다. SQL Query를 조작하여 데이터베이스를 도용하거나 무단으로 조회하는 행위를 의미합니다.
    > - Union based injection: table에서 원하는 정보를 탈취하기 위해, 해당 정보를 조회하는 union query 문을 조작하는 행위
    > - Boolean based injection: 데이터베이스에서 특정 값이 아닌 참/거짓을 전달 받으면서 데이터를 특정해나가는 행위이다.
    > - Time based injection: Boolean based injection 과 마찬가지로 server로 부터 참/거짓에 대한 응답을 받아 데이터를 특정해나가는 행위이다. SLEEP이나 BENCHMARK 등을 이용하여 DB를 의도적으로 지연/중지할 수 있으며, 시간적 제한요소를 두기 때문에 time based injection으로 일컫습니다.
- 대부분의 최신 브라우저에서는 HTTP 대신 HTTPS가 권장됩니다. 이유가 무엇일까요?

  > - HTTPS, (HTTP over secure socket layer = HTTP SSL)란 기존 프로토콜에 SSL을 적용하여 안정성이 확보된 통신 규약을 의미합니다.
  > - HTTP 프로토콜을 통한 데이터 통신 과정에 SSL/TLS 암호화 방식(양방향 암호화)를 적용하여 상대적으로 안전한 데이터 전달이 가능하도록 하였습니다.
  > - HTTPS를 사용한 웹 페이지를 통해 전송되는 모든 데이터는 추가적인 보안 계층이 있습니다. 이를 TLS(전송 계층 보안) 프로토콜이라고 합니다. 모든 유형의 데이터는 변경되거나 손상될 수 없는 HTTPS 사이트를 통해 전달되며 제 3자로부터 보호됩니다.
  > - 구글 검색 결과 페이지의 순위 결정 요인 중 하나입니다.

  - HTTPS와 TLS는 어떤 식으로 동작하나요? HTTPS는 어떤 역사를 가지고 있나요?

    > - HTTPS 동작 방식
    > - HTTPS는 HTTP 프로토콜 최상위에 TLS 암호화를 구현한 것입니다.
    > - TLS 동작 방식
    > - TLS는 컴퓨터 네트워크를 통해 통신 보안을 제공하도록 설계된 암호화 프로토콜입니다.
    > - TLS 프로토콜은 주로 2개 이상의 통신하는 컴퓨터 응용 프로그램 간에 인증서 사용과 같은 암호화 사용을 통해 개인정보, 무결성, 및 신뢰성을 포함한 보안을 제공하는 것을 목표로 합니다.
    > - 프리젠테이션 레이어에서 실행되며 TLS 레코드와 TLS 핸드셰이크 프로토콜의 두 레이어로 구성됩니다.

    > - HTTPS 역사
    > - 1994년에 Netscape Navigator 웹 브라우저를 위해 HTTPS를 개발하였습니다.
    > - 원래 HTTPS는 SSL 프로토콜과 함께 사용되었으나
    > - SSL이 TSL로 발전했을 때 2000년에 HTTPS는 공식적으로 RFC2818에 규정됨

  - HTTPS의 서비스 과정에서 인증서는 어떤 역할을 할까요? 인증서는 어떤 체계로 되어 있을까요?
    > - SSL 인증서는 웹사이트의 원본 서버에 설치되는 파일입니다.
    > - SSL 인증서는 웹 사이트의 트래픽을 TLS로 암호화 할 수 있습니다.

## Quest

- 메모장의 서버와 클라이언트에 대해, 로컬에서 발행한 인증서를 통해 HTTPS 서비스를 해 보세요.
  ? 로컬에서 발생한 인증서??

## Advanced

- TLS의 인증서에 쓰이는 암호화 알고리즘은 어떤 종류가 있을까요?
  > - 대칭키 전달 방식, 인증서 서명 방식, 대칭키 알고리즘, HMAC 알고리즘
- HTTP/3은 기존 버전과 어떻게 다를까요? HTTP의 버전 3이 나오게 된 이유는 무엇일까요?

## 궁금증

보통 유효성 검사를 로그인할 때나, 회원가입할 때 많이 하는데 또 어떤 경우에 많이할까?
프론트엔드 유효성 자료 https://blog.barogo.io/%EA%B0%9C%EB%B0%9C%EC%9D%B8%ED%84%B4-validation%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B3%A0%EB%AF%BC-532ffb986b64

https://www.cloudflare.com/ko-kr/learning/ssl/how-does-ssl-work/
