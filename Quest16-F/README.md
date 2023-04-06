# Quest 16-F. 컴포넌트 기반 개발

## Introduction

- 이번 퀘스트에서는 Vue.js 프레임워크를 통해 컴포넌트 기반의 웹 클라이언트 개발 방법론을 더 자세히 알아보겠습니다.

## Topics

- Vue.js framework
- vuex
- Virtual DOM

## Resources

- [Vue.js](https://vuejs.org)
  - [Lifecycle Hooks](https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html)
  - [State Management](https://v3.vuejs.org/guide/state-management.html)
  - [Virtual DOM](https://v3.vuejs.org/guide/optimizations.html#virtual-dom)

## Checklist

- Vue.js는 어떤 특징을 가지고 있는 웹 프레임워크인가요?
  > - vue.js 직접적인 dom 업데이트없이 상태값이 변하면 dom에도 적용이 되기 때문에 dom 조작보다 데이터에 집중 할수 있도록 만들어줍니다.
  - Vue.js는 내부적으로 어떤 식으로 동작하나요?
    > - 실제 dom을 렌더링할때는 많은 동작이 요구되기때문에 가상의 dom을 이용해서 비교한 뒤에 ui적으로 변한부분이 있을때만 dom을 업데이트합니다.
- Vue.js에서의 컴포넌트란 무엇인가요?

  > - 각각의 UI요소를 분리해 놓아서 재사용성을 높인 vue인스턴스를 의미합니다.

  - Vue 컴포넌트의 라이프사이클은 어떤 식으로 호출되나요?
    > - 컴포넌트 내부에 beforeCreate,created,beforeMount,mounted,beforeUpdate,updated 등의 메서드를 작성해주면 컴포넌트의 라이프사이클에 맞춰서 해당 메서드를 실행합니다.

- 컴포넌트 간에 데이터를 주고받을 때 단방향 바인딩과 양방향 바인딩 방식이 어떻게 다르고, 어떤 장단점을 가지고 있나요?

  > - 단방향 바인딩은 데이터가 한쪽으로만 흐르는 것을 의미하고 양방향 바인딩은 데이터가 양쪽 방향으로 흐르는 것을 의미합니다.
  > - 단방향 바인딩은 view 부분에서 데이터를 변경하기위한 입력이 발생했을때 model로 입력값을 전송하고 model은 다시 view부분의 데이터를 업데이트한다면
  > - 양방향 바인딩의 경우에는 view부분에 있는 데이터를 감시하는 watch를 이용해서 값이 변경된것을 자동으로 감지해서 model에 있는 데이터를 업데이트합니다.

  > 단방향 바인딩의 장점은 데이터가 한쪽 방향으로 흐르기 때문에 데이터 추적이 용이하고 단점으로는 데이터를 업데이트해주는 로직이 추가 되기때문에 코드량이 많아집니다.
  > 양방향 바인딩의 장점은 업데이트를 해주는 로직이 간결해지기때문에 코드량이 줄어들고 단점으로는 데이터가 양방향으로 흐르기때문에 추적이 어렵고 watch등 해당 데이터를 계속 감시해야하기때문에 성능상 좋지 않습니다.

- Vue.js 기반의 웹 어플리케이션을 위한 상태관리 라이브러리에는 어떤 것이 있을까요? 이러한 상태관리 툴을 사용하는 것에는 어떤 장단점이 있을까요?
  > - Vuex
  > - 장점: 상태를 전역적으로 관리하기 때문에 컴포넌트간의 데이터를 주고받는 과정을 생략할 수 있기때문에 상태를 관리하기 쉽습니다.
  > - 단점: 상태관리 라이브러리를 쓰는 컴포넌트는 상태관리 라이브러리에 대한 의존성이 생기는 단점이 있습니다.

## Quest

- Vue.js를 통해 메모장 시스템을 다시 한 번 만들어 보세요.
  - 어떤 컴포넌트가 필요한지 생각해 보세요.
  - 각 컴포넌트별로 해당하는 CSS와 자바스크립트를 어떤 식으로 붙여야 할까요?
  - Vue.js 시스템에 타입스크립트는 어떤 식으로 적용할 수 있을까요?
  - 컴포넌트간에 데이터를 주고받으려면 어떤 식으로 하는 것이 좋을까요?
  - `vue-cli`와 같은 Vue의 Boilterplating 기능을 이용하셔서 세팅하시면 됩니다.

## Advanced

- React와 Angular는 어떤 프레임워크이고 어떤 특징을 가지고 있을까요? Vue와는 어떤 점이 다를까요?
- Web Component는 어떤 개념인가요? 이 개념이 Vue나 React를 대체하게 될까요?
- Reactive Programming이란 무엇일까요?
