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
  > - Internal style sheet: HTML 문서 내의 `<head>`태그에 `<style>`태그를 사용하여 CSS 스타일을 적용합니다.
  > - External style sheet: 스타일을 적용할 웹 페이지의 `<head>`태그에 `<link>`태그를 사용하여 외부 스타일 시트를 포함해야만 스타일이 적용됩니다.
  - 세 가지 방법 각각의 장단점은 무엇일까요?
    - inline style
      > - 장점: HTML 페이지에 쉽고 빠르게 CSS를 삽입할 수 있습니다. 별도의 문서로 외부 스타일을 만들거나 업로드 할 필요가 없습니다.
      > - 단점: 모든 HTML 엘리먼트에 CSS를 인라인으로 추가하는 HTML 구조를 복잡하게 만듭니다. 또한 웹페이지 사이즈와 다운로드 시간에 영향을 줄 수 있습니다. 또한 인라인 스타일 속성이 많아질수록 유지보수하기가 어려워집니다.
    - Internal style sheet
      > - 장점: 동일한 HTML 파일 내에서만 코드를 추가하므로 여러 파일을 업로드할 필요가 없다.
      > - 단점: HTML 문서에 코드를 추가하는 것은 페이지의 사이즈와 로딩 시간을 증가시킬 수 있다.
    - External style sheet
      > - 장점: CSS 코드가 별도의 문서로 있기 때문에 HTML 파일 구조가 깔끔해지고, 사이즈가 작아집니다. 여러 페이지들에 같은 .css 파일을 사용할 수 있습니다.
      > - 단점: css파일이 로드되기 전까지 페이지가 올바르게 표시되지 않습니다. 여러 CSS 파일을 업로드 하거나 연결하면 사이트 다운로드 시간이 증가할 수 있습니다.
- CSS 규칙의 우선순위는 어떻게 결정될까요?
  > - !important > inline style(인라인) > Internal style sheet(내부) > External style sheet(외부)
  > - 선택자의 우선순위로는 id > class > tag 이름 > 전체 선택(\*)
- CSS의 박스 모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?
  > - HTML 요소가 웹 페이지에서 차지하는 공간을 정의한 모델입니다.
  > - HTML 모든 요소는 박스 형태로 되어 있으며 네 부분(영역)으로 이루어집니다. 각 영역을 콘텐츠 영역, 안쪽 여백(패딩) 영역, 테두리 영역, 바깥 여백(마진)영역이라고 부릅니다.
- `float` 속성은 왜 좋지 않을까요?
  > - 요소의 배치를 제어할 때 사용하는 속성입니다. 자식 요소에서 float 속성을 사용할 경우, 부모가 자식요소의 높이를 인식하지 못하는 문제가 발생하기 때문에 예측하기 어렵습니다.
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
- CSS의 어려움을 극복하기 위해 어떤 방법들이 제시되고 나왔을까요?
- CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?
- 웹 폰트의 경우에는 브라우저 엔진 별로 어떤 과정을 통해 렌더링 될까요?
