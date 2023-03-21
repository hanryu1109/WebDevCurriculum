# Quest 06. 인터넷의 이해

## Introduction

- 이번 퀘스트에서는 인터넷이 어떻게 동작하며, 서버와 클라이언트, 웹 브라우저 등의 역할은 무엇인지 알아보겠습니다.

## Topics

- 서버와 클라이언트, 그리고 웹 브라우저
- 인터넷을 구성하는 여러 가지 프로토콜
  - IP
  - TCP
  - HTTP
- DNS

## Resources

- [OSI 모형](https://ko.wikipedia.org/wiki/OSI_%EB%AA%A8%ED%98%95)
- [IP](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
  - [Online service Traceroute](http://ping.eu/traceroute/)
- [TCP](https://ko.wikipedia.org/wiki/%EC%A0%84%EC%86%A1_%EC%A0%9C%EC%96%B4_%ED%94%84%EB%A1%9C%ED%86%A0%EC%BD%9C)
  - [Wireshark](https://www.wireshark.org/download.html)
- [HTTP](https://ko.wikipedia.org/wiki/HTTP)
  - Chrome developer tool, Network tab
- [DNS](https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A9%94%EC%9D%B8_%EB%84%A4%EC%9E%84_%EC%8B%9C%EC%8A%A4%ED%85%9C)
  - [Web-based Dig](http://networking.ringofsaturn.com/Tools/dig.php)
  - [웹 브라우저에 URL을 입력하면 어떤 일이 생기나요?](https://aws.amazon.com/ko/blogs/korea/what-happens-when-you-type-a-url-into-your-browser/)

## Checklist

- 인터넷은 어떻게 동작하나요? Internet Protocol Suite의 레이어 모델에 입각하여 설명해 보세요.

  > - Internet Protocol Suite란 인터넷에서 컴퓨터들이 서로 정보를 주고받는 데 쓰이는 통신규약(프로토콜)의 모음입니다. Internet Protocol Suite 중 TCP(Transmission Control Protocol)와 IP(Internet Protocol) 프로토콜이 가장 많이 쓰이기 때문에 **TCP/IP Protocol Suite(5계층, Physical, Data Link, Internet, Transport, Application)** 라고 불립니다. (OSI 7 계층은 개념적 모델)

  - 근거리에서 서로 떨어진 두 전자기기가 유선/무선으로 서로 통신하는 프로토콜은 어떻게 동작할까요?

    > - 유선으로 통신하는 경우, 두 전자기기는 동일한 물리적 계층을 공유합니다. 물리적 계층이란 물리적으로 전송되는 데이터의 형식을 정의하며, 케이블, 허브, 스위치, 라우터 등의 장비가 포함됩니다. 두 전자기기 사이의 통신은 케이블을 통해 전송됩니다.
    > - 무선으로 통신하는 경우, 전자기기 간의 물리적인 연결이 없으므로, 두 전자기기는 동일한 물리적 레이어를 공유하지 않습니다. 대신, 무선 통신을 위해 사용되는 무선 랜(Wi-Fi)을 사용합니다. 무선 랜은 주파수를 사용하여 데이터를 전송합니다.
    > - 0과 1로 표현되는 데이터를 주고 받습니다.

  - 근거리에 있는 여러 대의 전자기기가 서로 통신하는 프로토콜은 어떻게 동작할까요?

    > - 근거리에 있는 여러 대의 전가기기는 스위치에 전선으로 직렬 연결되어있고 작은 네트워크가 형성되는데 이때 기기들을 구별하는 역할은 랜카드에 기입되어있는 Mac주소를 활용해서 통신을 합니다. 프레임단위로 데이터가 오고가고 프레임 내부에 Mac주소와 자신의 Mac주소가 다르면 데이터를 파기합니다. 데이터 링크 계층로 구분되며 랜카드의 Mac주소를 이용합니다.
    > - 근거리에 있는 여러 대의 전자기기가 서로 통신하는 프로토콜은 주로 무선 통신 기술을 이용합니다. 대표적인 무선 통신 기술로는 Wi-Fi, Bluetooth 등이 있습니다.

- 아주 멀리 떨어져 있는 두 전자기기가 유선/무선으로 서로 통신하는 프로토콜은 어떻게 동작할까요?

  > - 아주 멀리 떨어져 있는 두 전자기기가 서로 통신하는 경우, 주로 인터넷을 이용하여 통신합니다. 이를 위해서는 먼저 인터넷 서비스 제공자(ISP)로부터 인터넷 회선을 연결받아야 합니다. 이후, 이 회선을 이용하여 인터넷에 연결된 다른 전자기기와 데이터를 주고받을 수 있습니다.
  > - 네트워크 레이어에서 라우팅을 통하여 ip주소로 위치를 알아내고 데이터를 주고 받게 됩니다.

- 두 전자기기가 신뢰성을 가지고 통신할 수 있도록 하기 위한 프로토콜은 어떻게 동작할까요?

  > - 신뢰성을 가지고 통신한다는 의미는 데이터가 누락이 되지 않고 오류 없이 제대로 전송이 되는 것을 의미합니다. 대표적인 예로는 TCP(Transmission Control Protocol)가 있습니다.
  > - TCP는 Internet Protocol Suite의 전송 계층 프로토콜 중 하나로, 에러 검출 및 재전송 등을 수행하여 신뢰성 있는 데이터 전송을 보장합니다. TCP는 데이터를 일정한 크기의 조각으로 나누어 전송하며, 이를 세그먼트(Segment)라고 합니다. 전송된 세그먼트는 수신 측에서 다시 조합되어 데이터를 복원합니다. 또한, TCP는 패킷의 순서를 확인하고 조정함으로써 데이터의 정확성과 완전성을 보장합니다.

  > - 3 Way Handshake를 통해 연결이 성립됩니다.
  > - 클라이언트가 서버에서 SYN 패킷을 전송
  > - 서버가 SYN을 받고, 클라이언트에게 받았다는 신호인 ACK와 SYN 패킷 전송
  > - 클라이언트는 ACK 와 SYN을 받고 서버에게 ACK 메시지 서버 전송 (연결 성립)
  > - 연결을 종료할 때는 4 Way Handshake를 사용합니다. (클라이언트 서버에게 FIN 플래그 - 서버는 클라이언트에게 ACK 패킷 - 서버가 클라이언트에게 FIN 플래그 전송 - 클라이언트는 ACK 서버에게 전송)

- **HTTP는 어떻게 동작할까요?**

  > - HTTP(HyperText Transfer Protocol)는 인터넷 상에서 서버와 클라이언트 간에 정보(데이터)를 주고받는 통신 프로토콜입니다.
  > - HTTP는 서버/클라이언트 모델을 따릅니다. 클라이언트는 HTTP 요청 메시지를 서버에 보내고, 서버는 요청을 처리한 후에 HTTP 응답 메시지를 클라이언트에게 반환합니다.
  > - HTTP 요청 메시지는 크게 요청 라인(Request Line), 요청 헤더(Request Header), 요청 본문(Request Body)으로 구성됩니다. 요청 라인은 요청 메서드(GET, POST, PUT 등), 요청 URI(Uniform Resource Identifier), HTTP 버전으로 구성되며, 요청 헤더는 요청에 대한 부가적인 정보들을 포함합니다. 요청 본문은 POST 등의 요청 메서드를 사용할 때 데이터를 전송할 때 사용됩니다.

  ```
    GET /images/logo.gif HTTP/1.1
    Accept: application/json
    Authorization: Bearer UExBMDFUMDRQV1MwMnzpdvtYYNWMSJ7CL8h0zM6q6a9ntw
  ```

  > - 서버는 요청 메시지를 받은 후 요청을 처리합니다. 이후, HTTP 응답 메시지를 생성하여 클라이언트에게 전송합니다. HTTP 응답 메시지는 상태 라인(Status Line), 응답 헤더(Response Header), 응답 본문(Response Body)으로 구성됩니다. 상태 라인은 HTTP 상태 코드와 함께 HTTP 버전을 포함하며, 응답 헤더는 응답에 대한 부가적인 정보를 포함합니다. 응답 본문은 요청에 대한 실제 응답 내용을 포함합니다.

  ```
    HTTP/1.1 200 OK
    Date: Mon, 23 May 2005 22:38:34 GMT
    Content-Type: text/html; charset=UTF-8
    Content-Encoding: UTF-8
    ...

    <html>
    <head>
      <title>An Example Page</title>
    </head>
    <body>
      Hello World, this is a very simple HTML document.
    </body>
    </html>
  ```

- 우리가 브라우저의 주소 창에 www.knowre.com 을 쳤을 때, 어떤 과정을 통해 서버의 IP 주소를 알게 될까요?
  > 1. 입력한 도메인(www.knowre.com)을 사용하여 웹 사이트를 호스팅하는 서버의 IP 주소를 조회해야 합니다. DNS 조회를 사용하여 이 작업을 수행합니다.
  > 2. DNS는 복잡하고 매우 빨라야 하기 때문에 DNS 데이터는 웹 브라우저 사이의 서로 다른 계층과 인터넷의 다양한 위치에 임시로 저장됩니다. 이를 캐시(Cache)라고 부르는데, 웹 브라우저는 고유한 캐시, 운영 체제 캐시, 라우터의 로컬 네트워크 캐시, 회사 네트워크 또는 인터넷 서비스 제공업체(ISP)의 DNS 서버 캐시에서 해당 도메인 이름에 대한 IP 주소를 확인합니다.
  > 3. 웹 브라우저가 캐시 계층에서 IP 주소를 찾을 수 없는 경우 회사 네트워크 또는 ISP의 DNS 서버가 재귀적으로 DNS 조회를 수행합니다. (DNS 서버는 이 쿼리를 받으면 먼저 자신의 DNS 캐시에서 해당 도메인 이름에 대한 IP 주소를 찾습니다. 만약 해당 정보가 없다면, 루트 DNS 서버에 쿼리를 보내 해당 도메인 이름의 네임 서버 정보를 찾습니다.)
  > 4. 루트 DNS 서버는 자신이 관리하는 최상위 도메인(.com, .net, .org 등)의 네임 서버 정보를 알려줍니다.
  > 5. 그리고 로컬 DNS 서버는 해당 도메인 이름의 네임 서버에 쿼리를 보내 IP 주소를 받아옵니다.
  > 6. 브라우저는 이제 해당 도메인의 IP 주소를 가지고 해당 서버에 HTTP 요청을 보내고, 서버는 요청에 대한 응답을 보내줍니다. 이 응답은 브라우저가 이해할 수 있는 HTML, CSS, JavaScript 등의 형태로 렌더링 되어 화면에 보여집니다.

## Quest

- tracert(Windows가 아닌 경우 traceroute) 명령을 통해 www.google.com 까지 가는 경로를 찾아 보세요.

  - 어떤 IP주소들이 있나요?
    <br/>
    <img width="533" alt="스크린샷 2023-03-20 오후 6 40 25" src="https://user-images.githubusercontent.com/82071500/226324101-540eda92-966d-498b-9557-a955b7e331b8.png">

  - 그 IP주소들은 어디에 위치해 있나요?
    > - 121.138.230.5 : 성남시 분당구
    >   -72.14.243.228 : 미국, 캘리포니아, 마운티뷰 시티

- Wireshark를 통해 www.google.com 으로 요청을 날렸을 떄 어떤 TCP 패킷이 오가는지 확인해 보세요.

  - Wireshark 툴은 패킷을 캡쳐하고 분석하는 오픈 소스 프로그램입니다.
    <img width="1115" alt="스크린샷 2023-03-20 오후 7 08 33" src="https://user-images.githubusercontent.com/82071500/226323959-78355657-f55c-4cbc-ae95-c5cb646681ef.png">

  - TCP 패킷을 주고받는 과정은 어떻게 되나요? > - 먼저 3-Way Hand Shake 과정을 수행합니다.
    > - Client(Source Port) 에서 Server(Destination Port)로 통신을 원한다는 신호를 보냅니다. [SYN] Seq = 0
    > - Server에서 SYN을 정상적으로 받았다는 신호를 보냅니다. [SYN, ACK] Seq=0 Ack=1
    > - Client에서 SYN-ACK를 잘 받았다고 신호를 보냅니다. [ACK] Seq=1 Ack=1
    > - Client 에서 HTTP 요청을 보냅니다. [GET / HTTP/1.1]
    > - Server 측에서 확인 신호를 보냅니다.
  - 각각의 패킷에 어떤 정보들이 담겨 있나요?
    <img width="897" alt="스크린샷 2023-03-20 오후 7 10 06" src="https://user-images.githubusercontent.com/82071500/226323625-58fbdb02-93f1-4997-9418-938fd2a917dc.png">

    > - Source Port (발신지 포트 필드) : 발신지 포트 필드는 발신지에서 오픈된 포트입니다. 위 포트를 보면 57406 포트인 것을 확인할 수 있습니다.
    > - Destination Port (목적지 포트 필드) : 목적지 포트 필드는 수신지에서 오픈된 포트입니다. 위의 패킷을 보면 443 포트인 것을 확인할 수 있습니다.
    > - Sequence Number (순차 번호 필드) : 순차번호필드는 고유한 번호를 가지며, 이 값으로 TCP 세그먼트에 대한 식별값을 제공하며, 통신 스트림일부가 분실되면 확인을 위해 수신자를 사용가능하게 합니다. 이 순차번호는 패킷에 포함되어 있는 데이터 만큼 증가하게 됩니다.
    > - Acknowledgement Number (확인 응답 번호 필드) : 확인 응답 번호 필드는 다음번에 기대되는 순차번호를 표시합니다. ack number에 관련하여 62 값을 가지게 됩니다.

- telnet 명령을 통해 http://www.google.com/ URL에 HTTP 요청을 날려 보세요.

  - 어떤 헤더들이 있나요?
    <br/>
    <img width="795" alt="스크린샷 2023-03-20 오후 7 19 07" src="https://user-images.githubusercontent.com/82071500/226322784-c392c1ee-4483-4c20-998f-4bc22ae8a6a3.png">

  - 그 헤더들은 어떤 역할을 하나요?
    > - Date : HTTP 메세지 생성 일자
    > - Expires : 리소스가 지정된 일시까지 유효함을 나타냅니다.
    > - Cache-Control : 쿠키/캐시 관련 정보
    > - Content - Type : 미디어 타입 정보
    > - Connection : Server / Client 간의 연결 옵션
    > - Server : 서버의 정보
    > - X-XSS-Protection : 특정 브라우저에서 제공하는 기능, XSS공격을 감지 할 때 페이지 로드를 중지 시킬 수 있습니다.
    > - X-Frame-Options : 해당 페이지를 `<frame>` 또는 `<iframe>` , `<object>` 에서 렌더링 할 수 있는지 여부를 나타내는데 사용됩니다.
    > - Set-Cookie : 서버측에서 클라이언트측으로부터 세션 쿠기 정보를 설정 합니다.
    > - Accept-Ranges : 부분 요청에 지원을 알리기 위해 서버에 의해 사용되는 표식. 이 헤더가 존재하면 브라우저는 처음부터 다시 다운로드를 시작하지 않고, 중단된 다운롣를 재개하려고 합니다.
    > - Vary : 캐시 된 응답을 향후 요청들에서 오리진 서버로 새로운 요청 헤더를 요청하는 대신 사용할 수 있는지 여부를 결정합니다.
    > - Transfer-Encoding : 사용자에게 entity를 안전하게 전송하기 위해 사용하는 인코딩 형식을 지정합니다.

## Advanced

- HTTP의 최신 버전인 HTTP/3는 어떤 식으로 구성되어 있을까요?
  > - HTTP/1 및 HTTP/2가 TCP로 통신하는 것과는 달리 HTTP/3는 User Datagram Protocol(UDP, UDP는 세계 통신표준으로 개발된 OSI 모형에서 4번째 계층인 전송 계층(Transport Layer)에서 사용하는 규약) 기반의 QUIC 프로토콜을 사용하여 통신합니다.
- TCP/IP 외에 전세계적인 네트워크를 구성하기 위한 다른 방식도 제안된 바 있을까요?
  > - NetBEUI(NetBIOS Extended User Interface): NetBEUI는 IBM에서 개발한 프로토콜로, 이더넷 네트워크를 기반으로 작동합니다. 이 프로토콜은 빠른 전송 속도와 쉬운 구성 등을 제공합니다.
  > - IPX/SPX: IPX/SPX는 Novell에서 개발한 네트워크 프로토콜입니다. 이 프로토콜은 Novell의 NetWare 운영 체제에서 주로 사용되었습니다.
  > - 그러나 이러한 프로토콜과 아키텍처는 대부분 현재 사용되지 않거나 특정 분야에서만 사용됩니다. TCP/IP는 다양한 운영 체제와 장비에서 호환성이 높고, 인터넷에 연결된 거의 모든 기기에서 지원되므로, 현재 가장 보편적인 네트워크 프로토콜입니다.
