# Quest 03. 자바스크립트와 DOM

## Introduction

- 자바스크립트는 현재 웹 생태계의 근간인 프로그래밍 언어입니다. 이번 퀘스트에서는 자바스크립트의 기본적인 문법과, 자바스크립트를 통해 브라우저의 실제 DOM 노드를 조작하는 법에 대하여 알아볼 예정입니다.

## Topics

- 자바스크립트의 역사
- 기본 자바스크립트 문법
- DOM API
  - `document` 객체
  - `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()` 함수들
  - 기타 DOM 조작을 위한 함수와 속성들
- 변수의 스코프
  - `var`, `let`, `const`

## Resources

- [자바스크립트 첫걸음](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps)
- [자바스크립트 구성요소](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Building_blocks)
- [Just JavaScript](https://justjavascript.com/)

## Checklist

- 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?
  > - 1995년에 자바스크립트는 넷스케이프(Netscape)의 브랜던 아이크(Brendan Eich)에 의해 만들어졌습니다. 1996년에 넷스케이프는 자바스크립트를 국제 표준안으로 만들기 위해 ECMA(European Computer Manufactures Association)에 제출합니다. 그 결과 ECMA는 ECMAScript라는 새로운 표준을 제정하였습니다. 그 후, 자바스크립트는 다양한 버전을 거쳐 발전하면서 현재의 모습을 갖추게 되었습니다.
  - 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?
    > - 자바스크립트의 표준이 필요해 생긴 것이 ECMA 이고, ES5, ES6 등등은 기능이 확장되면서 나온 버전들입니다.
    > - ES5: `use strict`, 배열 관련 메서드(forEach, map, filter, reduce) 등이 추가되었습니다.
    > - ES6: `class`를 지원하며 `let`, `const`, Arrow function, Template Literal, destructuring, Promise 등이 추가되었습니다.
    > - ES2016: `Array.includes()`, 지수 연산자 추가(\*\*)
    > - ES2017: `async/await` 구문 추가
    > - 이후: rest/spread 문법을 객체에서도 사용, optional chaining 연산자 추가 등등
  - 자바스크립트의 표준은 어떻게 제정될까요?
    > - ECMA Internationals에서 표준을 제정합니다.
    > - ECMA Internationals에서 TC39 위원회가 명세의 관리를 맡고 있습니다.
    > - 4단계에 걸쳐서 협의가 이뤄지고 다음 표준에 기능이 추가되는 형식입니다.
- 자바스크립트의 문법은 다른 언어들과 비교해 어떤 특징이 있을까요?
  > - 동적이며 타입을 명시할 필요가 없습니다.
  > - 프로토타입 기반 객체지향 언어: 객체를 생성할 때 클래스가 필요하지 않습니다. 대신, 기존 객체를 복제하거나, 프로토타입 객체를 활용하여 새로운 객체를 생성합니다.
  - 자바스크립트에서 반복문을 돌리는 방법은 어떤 것들이 있을까요?
    > - for, while, for...in, for...of, do...while
- 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?
  > - `element.classList.add`, `element.classList.remove` 메소드 활용
  - IE9나 그 이전의 옛날 브라우저들에서는 어떻게 해야 하나요?
    > - element.className 에 할당
    ```html
    <div id="div1" class="someclass">
      <img ... id="image1" name="image1" />
    </div>
    ```
    ```js
    var d = document.getElementById("div1");
    d.className += " otherclass";
    ```
- 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?
  > - 변수 유효범위(Scope)는 변수가 선언된 위치에 따라 결정됩니다.
  > - `let`, `const` 로 선언한 변수의 스코프틑 블록 스코프를 가집니다.
  > - `var`로 선언한 변수의 스코프는 함수 스코프이거나 전역 스코프입니다. 블록 기준으로 스코프가 생기지 않기 때문에 블록 밖에서 접근 가능합니다.
  - `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?
    > - `var` 키워드를 이용하여 변수를 정의하면 재선언하는 것이 가능하지만 `let` 키워드는 재선언이 불가능합니다.
    > - 두 키워드 모두 선언 시, 호이스팅되지만 `let` 키워드를 이용하여 선언한 변수는 선언 전에는 참조할 수 없습니다.
- 자바스크립트의 익명 함수는 무엇인가요?
  > - 이름 없이 선언한 함수를 의미합니다.
  - 자바스크립트의 Arrow function은 무엇일까요?
    > - `function` 키워드 없이 함수를 만들 수 있으며 `return` 키워드가 없어도 식을 계산한 값이 자동으로 반환됩니다.
    > - 일반 함수와 다르게 `this`가 존재하지 않습니다. 따라서 화살표 함수 본문에서 `this`에 접근하면 외부에서 값을 가져오게 됩니다. 따라서 상위 객체의 this를 가리키게 됩니다.

## Quest

- (Quest 03-1) 초보 프로그래머의 영원한 친구, 별찍기 프로그램입니다.
  - [이 그림](jsStars.png)과 같이, 입력한 숫자만큼 삼각형 모양으로 콘솔에 별을 그리는 퀘스트 입니다.
    - 줄 수를 입력받고 그 줄 수만큼 별을 그리면 됩니다. 위의 그림은 5를 입력받았을 때의 결과입니다.
  - `if`와 `for`와 `function`을 다양하게 써서 프로그래밍 하면 더 좋은 코드가 나올 수 있을까요?
  - 입력은 `prompt()` 함수를 통해 받을 수 있습니다.
  - 출력은 `console.log()` 함수를 통해 할 수 있습니다.
- (Quest 03-2) skeleton 디렉토리에 주어진 HTML을 조작하는 스크립트를 완성해 보세요.
  - 첫째 줄에 있는 사각형의 박스들을 클릭할 때마다 배경색이 노란색↔흰색으로 토글되어야 합니다.
  - 둘째 줄에 있는 사각형의 박스들을 클릭할 때마다 `enabled`라는 이름의 CSS Class가 클릭된 DOM 노드에 추가되거나 제거되어야 합니다.
- 구현에는 여러 가지 방법이 있으나, 다른 곳은 건드리지 않고 TODO 부분만 고치는 방향으로 하시는 것을 권장해 드립니다.

## Advanced

- Quest 03-1의 코드를 더 구조화하고, 중복을 제거하고, 각각의 코드 블록이 한 가지 일을 전문적으로 잘하게 하려면 어떻게 해야 할까요?
  > - 중복이 되는 코드가 무엇이 있는지 확인하고 함수로 추출합니다.
- Quest 03-2의 스켈레톤 코드에서 `let` 대신 `var`로 바뀐다면 어떤 식으로 구현할 수 있을까요?
  > - `var` 키워드를 사용하면 변수 재선언이 가능하고 그로 인하 예상치 못한 버그가 생길 수가 있으니 변수이름에 조금 더 신경써서 작업할 것 같습니다.
