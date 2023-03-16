# Quest 02. CSS의 기초와 응용

## Introduction

- CSS는 Cascading StyleSheet의 약자입니다. 웹브라우저에 표시되는 HTML 문서의 스타일을 지정하는 (거의) 유일하지만 다루기 쉽지 않은 언어입니다. 이번 퀘스트를 통해 CSS의 기초적인 레이아웃 작성법을 알아볼 예정입니다.

## Topics

- CSS의 기초 문법과 적용 방법
  - Inline, `<style>`, `<link rel="stylesheet" href="...">`
- CSS 규칙의 우선순위
- 박스 모델과 레이아웃 요소
  - 박스 모델: `width`, `height`, `margin`, `padding`, `border`, `box-sizing`
  - `position`, `left`, `top`, `display`
  - CSS Flexbox와 Grid
- CSS 표준의 역사
- 브라우저별 Developer tools

## Resources

- [MDN - CSS](https://developer.mozilla.org/ko/docs/Web/CSS)
- [Centering in CSS: A Complete Guide](https://css-tricks.com/centering-css-complete-guide/)
- [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [그리드 레이아웃과 다른 레이아웃 방법과의 관계](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout/%EA%B7%B8%EB%A6%AC%EB%93%9C_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%EA%B3%BC_%EB%8B%A4%EB%A5%B8_%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83_%EB%B0%A9%EB%B2%95%EA%B3%BC%EC%9D%98_%EA%B4%80%EA%B3%84)

## Checklist

- CSS를 HTML에 적용하는 세 가지 방법은 무엇일까요?
  > - inline style: HTML 요소 내부에 style 속성을 사용하여 CSS 스타일을 적용하는 방법입니다.
  > - Internal style sheet: HTML 문서 내의 `<head>` 태그에 `<style>` 태그를 사용하여 CSS 스타일을 적용합니다.
  > - External style sheet: 스타일을 적용할 웹 페이지의 `<head>` 태그에 `<link>` 태그를 사용하여 외부 스타일 시트를 포함해야만 스타일이 적용됩니다.
  - 세 가지 방법 각각의 장단점은 무엇일까요?
    - inline style
      > - 장점: HTML 페이지에 쉽고 빠르게 CSS를 삽입할 수 있습니다. 별도의 문서로 외부 스타일을 만들거나 업로드 할 필요가 없습니다.
      > - 단점: 모든 HTML 엘리먼트에 CSS를 인라인으로 추가하는 HTML 구조를 복잡하게 만듭니다. 또한 웹페이지 사이즈와 다운로드 시간에 영향을 줄 수 있습니다. 또한 인라인 스타일 속성이 많아질수록 유지보수하기가 어려워집니다.
    - Internal style sheet
      > - 장점: 동일한 HTML 파일 내에서만 코드를 추가하므로 여러 파일을 업로드할 필요가 없다.
      > - 단점: HTML 문서에 코드를 추가하는 것은 페이지의 사이즈와 로딩 시간을 증가시킬 수 있다.
    - External style sheet
      > - 장점: CSS 코드가 별도의 문서로 있기 때문에 HTML 파일 구조가 깔끔해지고, 사이즈가 작아집니다. 여러 페이지에 같은 CSS 파일을 사용할 수 있습니다.
      > - 단점: CSS 파일이 로드되기 전까지 페이지가 올바르게 표시되지 않습니다. 여러 CSS 파일을 업로드 하거나 연결하면 사이트 다운로드 시간이 증가할 수 있습니다.
- CSS 규칙의 우선순위는 어떻게 결정될까요?
  > - !important > inline style(인라인) > Internal style sheet(내부) > External style sheet(외부)
  > - 선택자의 우선순위로는 id > class > tag 이름 > 전체 선택(\*)
  > - 복잡한 서식 > 단순한 서식(같은 엘리먼트라 가정)
- CSS의 박스 모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  > - HTML 요소가 웹 페이지에서 차지하는 공간을 정의한 모델입니다.
  > - HTML 모든 요소는 박스 형태로 되어 있으며 네 부분(영역)으로 이루어집니다. 각 영역을 콘텐츠 영역, 안쪽 여백(패딩) 영역, 테두리 영역, 바깥 여백(마진) 영역이라고 부릅니다.
- `float` 속성은 왜 좋지 않을까요?
  > - 요소의 배치를 제어할 때 사용하는 속성입니다. 자식 요소에서 float 속성을 사용할 경우, 부모가 자식 요소의 높이를 인식하지 못하는 문제가 발생하기 때문에 예측하기 어렵습니다.
  > - 예측하기 어렵고, 반응형 어럽게 만들기 때문입니다.
- Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?
  > - flexbox는 기본적으로 1차원 레이아웃을 위해 만들어졌습니다. 모든 방향으로 정렬이 가능하고 reverse도 가능합니다. 다중 행과 다중 열의 레이아웃을 구성하기는 어렵습니다.
  > - grid는 2차원 레이아웃을 위해 만들어졌습니다. 복잡한 레이아웃 구성이 가능합니다. 그러나 모든 브라우저에서 지원하지는 않습니다.
- CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?
  > - 비슷한 속성을 가지고 있는 요소들을 그룹화하여 정리할 수 있습니다.

## Quest

- Quest 01에서 만들었던 HTML을 바탕으로, [이 그림](screen.png)의 레이아웃과 CSS를 최대한 비슷하게 흉내내 보세요. 꼭 완벽히 정확할 필요는 없으나 align 등의 속성은 일치해야 합니다.
- **주의사항: 되도록이면 원래 페이지의 CSS를 참고하지 말고 아무것도 없는 백지에서 시작해 보도록 노력해 보세요!**

## Advanced

- 왜 CSS는 어려울까요?
  - 어떤 CSS 규칙이 최종적으로 적용될 지 예측하기 어렵습니다. CSS 최종 결과값을 알기 위해서는 해당 문서 파일과 함께 불러오는 CSS 속성을 살펴봐야 하는 경향이 있습니다. 또한 DOM 요소는 부모 요소로부터 CSS 속성을 상속할 수도 있습니다. 따라서 해당 요소의 특정 CSS 값을 알기 위해서는 모든 부모 요소의 CSS 값도 파악해야 할 수 있습니다.
  - 웹 브라우저 종류, 브라우저 버전, OS 마다 CSS 결과값이 다를 수 있습니다.
  - Global namespace: 모든 스타일이 global에 선언되어 중복되지 않는 class 이름을 적용해야 하는 문제
  - Dead Code Elimination: 기능 추가, 변경, 삭제 과정에서 불필요한 CSS를 제거하기 어려운 문제
  - Sharing Constants: JS 코드와 상태 값을 공유할 수 없는 문제
  - Non-deterministic Resolution: CSS 로드 순서에 따라 스타일 우선 순위가 달라지는 문제
  - Breaking Isolation: CSS의 외부 수정을 관리하기 어려운 문제(캡슐화)
- CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
  > - CSS의 글로벌 스코프로 인해서 컴포넌트와 CSS간의 구조와 범위가 일치하지 않는 문제를 극복하기 위하여 CSS modules가 나오게 되었습니다. 컴포넌트에서 CSS를 불러와서 컴포넌트에서만 적용이 될 수 있도록 해주었습니다.
  > - Nested한 Selector와 variable를 등록할 수 있는 추가적인 문법으로만 작성하면 CSS로 변환을 시켜주는 전처리기가 나왔습니다. (Sass, Less, Stylus)
  > - CSS in JS 의 등장으로 글로벌 스코프 문제를 해결할 수 있고, element와 CSS의 의존관계를 명확하게 할 수 있습니다.
- CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
  > - 브라우저 렌더링 엔진이 html을 파싱하면서 DOM을 생성하게 되는데 파싱 중에 `<link>` 태그나 `<style>` 태그를 만나게 되면 DOM 생성을 잠시 중단하고 CSS를 파싱하면서 CSSOM을 생성합니다. 그리고 html 파싱을 이어나가면서 DOM을 구축하게 됩니다.
  > - 생성된 DOM 트리와 CSSOM 트리를 결합하여 렌더트리를 형성합니다.
  > - 레이아웃 작업을 통해 돔의 위치와 크기를 계산해서 배치합니다.
  > - 페인팅 작업을 통해 픽셀값을 채워넣으면서 CSS 가 적용됩니다.
- 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
  > - 크롬, 사파리, 파이어폭스: FOIT(Flash of Invisible Text) 방식으로 웹 폰트가 로드될 때까지 텍스트 렌더링 하지 않다가 웹 폰트가 로드된 후에 텍스트를 보여줍니다.
  > - 익스플로러, 엣지: FOUT(Flash of Unstyled Text) 방식으로 로드되기 전에는 시스템의 기본 폰트로 보여주고 이후 로드되면 reflow 해서 글꼴을 대체하는 방식입니다.

## Think About

- 웹의 주된 역할이 document 일 때:
  > - html, css 분리되어야만 유지보수가 쉬었습니다.
- 현재는 웹의 방향이 document 에서 application 으로 변화 또는 확장되고 있는데 이러한 관점에서는:
  > - html, css 분리되지 않는다는 것이 꼭 나쁜 것만은 아닙니다.
  > - 어플리케이션화 되면은 각각의 구조를 컴포넌트화에 대한 니즈가 있고 컴포넌트화 되었을 때는 오히려 컴포넌트 환경에서 inline 형태로 css 작성하는 것이 UI 모양 예측이나 css 관리가 쉬웠습니다.
- 웹의 변화(문서와 어플리케이션의 경계가 허물어 지는)에 따라 css 작성 방식에 대한 관점이 달라질 수 있습니다.

## Reference

https://velog.io/@teo/css-history-1
https://d2.naver.com/helloworld/4969726
