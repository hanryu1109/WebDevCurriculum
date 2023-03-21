# Quest 07. node.js의 기초

## Introduction

- 이번 퀘스트에서는 node.js의 기본적인 구조와 개념에 대해 알아 보겠습니다.

## Topics

- node.js
- npm
- CommonJS와 ES Modules

## Resources

- [About node.js](https://nodejs.org/ko/about/)
- [Node.js의 아키텍쳐](https://edu.goorm.io/learn/lecture/557/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-node-js/lesson/174356/node-js%EC%9D%98-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90)
- [npm](https://docs.npmjs.com/about-npm)
- [npm CLI commands](https://docs.npmjs.com/cli/v7/commands)
- [npm - package.json](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
- [How NodeJS Require works!](https://www.thirdrocktechkno.com/blog/how-nodejs-require-works)
- [MDN - JavaScript Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [require vs import](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/)

## Checklist

- node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?

  > - Ryan Dahl이 발표한 node.js는 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경입니다. 간단히 말해 브라우저에서만 동작하던 자바스크립트를 브라우저 이외의 환경에서 동작시킬 수 있는 자바스크립트 샐황환경이 node.js입니다.
  > - V8 : V8은 C++로 작성된 Google의 오픈 소스 고성능 JavaScript 및 WebAssembly 엔진입니다.
  > - libuv: libuv는 C 라이브러리로 논블로킹 I/O 작업을 지원하는 모든 플랫폼에서 일관된 인터페이스로 추상화하는 데 사용됩니다. libuv는 파일 시스템, DNS, 네트워크, 자식 프로세스, 파이프, 신호 처리, 폴링, 스트리밍을 다루는 메커니즘을 제공하고 운영체제 수준에서 비동기로 처리될 수 없는 작업을 위한 스레드 풀도 포함하고 있습니다.
  > - llhttp: HTTP 파싱은 llhttp라는 경량 C 라이브러리가 처리합니다. 이는 시스템 호출이나 할당을 하려고 만들어진 것이 아니므로 요청당 아주 작은 메모리 공간만 차지합니다.
  > - c-ares, OpenSSL, zlib 등등이 있습니다.

- npm이 무엇인가요? `package.json` 파일은 어떤 필드들로 구성되어 있나요?

  > - Node.js는 모든 것이 모듈화되어 있으므로 질 좋은 패키지 매니저가 필요해졌습니다. 이 목적 때문에 자바스크립트 패키지 패니저인 npm이 만들어졌습니다. node.js 에서 사용할 수 있는 모듈들을 패키지화해서 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI를 제공합니다.
  > - `package.json`은 프로젝트가 의존하는 패키지의 목록(의존성 관리), 프로젝트의 버전, 라이센스 등을 명시한 문서입니다. 패키지 이름(name), 패키지 버전(version), 패키지에 대한 설명(description), 프로젝트 홈페이지 주소(homepage), 패키지 라이센스(license), 프로젝트에 포함시키 파일들의 배열(files), 프로그램의 시작 포인트를 가리키는 모듈 ID(main),자주 사용하는 command의 단축 명령어(scripts), npm에서 검색(keywords), 저자(author), 패키지의 의존성을 관리하는 dependencies와 devDependencies 등이 있습니다.

- npx는 어떤 명령인가요? npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

  > - `execute npm package binaries`의 줄임말로, npm에 속해 있는 npm 패키지 실행 도구입니다. npx는 설치 없이 패키지를 실행하는 명령어입니다. 해당 패키지를 실행만 되게 해 주기 때문에 가볍게 쓸 수 있습니다.
  > - `-g` 옵션을 붙여서 글로벌에 npm 패키지를 저장할 경우 해당 패키지 외부에서도(전역적으로) npm 패키지를 사용할수 있습니다. 그러나 글로벌에 저장하지 않았다면 해당 npm 패키지는 다운받은 곳(로컬)에서만 사용할 수 있습니다.

- 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

  > - 처음 자바스크립트는 모듈을 가져오거나 내보내는 방법이 없어, 하나의 파일에 모든 기능들이 들어가야 했습니다.
  > - 불편함을 느꼈고 CommonJS에 의해 처음 모듈 시스템이 만들어졌습니다.
  > - 초창기에는 node.js도 CommonJS를 보편적으로 사용하였습니다. 그러나 CommonJS도 한계점이 존재하였고 그로 인하여 AMD(Asynchronous Module Definition), UMD(Universal Module Definition, AMD와 CommonJS가 서로 호환되지 않는 문제를 해결하기 위한 API) 등을 통해 다른 파일의 코드를 불러오는 시도들이 있었습니다.
  > - 현재는 자바스크립트 언어 자체에 모듈 시스템을 들여 오면서(ES Modules) 일반적인 경우 ES Modules를 사용하고 특별한 경우 또는 상황에서만 CommonJS 를 사용합니다.

  ```js
  // AMD 방식
  // myModule.js
  // define을 이용해 새로운 모듈을 불러오고, 콜백함수로 전해줌
  define(["package/lib"], function (lib) {
    // 콜백함수 이용해서, 불러온 모듈 사용가능
    function foo() {
      lib.log("hello world!");
    }

    // 다른파일에서 foo함수를 foobar이란 이름의 모듈로 불러올 수 있게 만듬
    return {
      foobar: foo,
    };
  });
  ```

  ```js
  // 위에서 선언한 모듈 불러오기
  require(["package/myModule"], function (myModule) {
    myModule.foobar();
  });
  ```

  ```js
  // UMD 방식
  (function (root, factory) {
  if (typeof define === 'function' && define.amd) { // AMD
    define(['jquery', 'aaaa'], factory);
  } else if (typeof module === 'object' && module.exports) { // CommonJS
    module.exports = factory(require('jquery'), require('aaaa'));
  } else { // window
    root.myModule = factory(root.$, root.Z);
  }
  }(this, function($, Z) {
  return {
    a: $,
    b: Z,
  };
  });
  ```

  > - CommonJS에서는 `require()`와 `module.exports`를 사용하며, ESM은 `import`와 `export`를 사용합니다.
  > - 기존의 CommonJS는 모듈을 다 불러와야했지만 ES Modules tree shaking(필요없는 모듈을 제거하는 작업)을 통해 실제 사용되는 부분만 불러올 수 있게 되었습니다.
  > - CommonJS는 서버 환경에서 저장된 파일을 불러오는 형식이기 때문에 동기적으로 동작합니다. 즉, 파일을 불러오는 동안 블로킹이 발생합니다. 클라이언트 환경에서는 여러개의 모듈을 저장되있는 파일이 아닌 url을 통해 받아오기 때문에 비동기적으로 작동하는 것이 유리합니다. 모듈을 찾고 불러오고 인스턴스화 하는 과정들을 분리하고 비동기적으로 빠르게 동작시키기위해 ES Modules가 나오게 되었습니다.

- ES Modules는 기존의 `require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

  > - ES Modules는 파일 맨처음에서만 import로 파일을 가져올수 있는 반면에 CommonJS에서는 어느 구간에서나 `require()`를 통해 동적으로 모듈을 가져올 수가 있습니다.

- node.js에서 ES Modules를 사용하려면 어떻게 해야 할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

  > - node.js에서 ES Modules를 사용하려면 확장자 이름을 .mjs로 명시하여 해당 파일이 모듈인 것을 명시하거나 package.json의 type 필드에 "module"이라고 명시합니다.
  > - ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 default import로 가능합니다.
  > - CommonJS 기반의 코드에서 ES Modules 기반의 패키지를 불러오려면 비동기로 작동하기 때문에 async, await 혹은 .then을 이용하여 비동기처리를 따로 해주면 됩니다.

## Quest

- 스켈레톤 코드에는 다음과 같은 네 개의 패키지가 있으며, 용도는 다음과 같습니다:
  - `cjs-package`: CommonJS 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  - `esm-package`: ES Modules 기반의 패키지입니다. 다른 코드가 이 패키지의 함수와 내용을 참조하게 됩니다.
  - `cjs-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, CommonJS 기반의 프로젝트입니다.
  - `esm-my-project`: `cjs-package`와 `esm-package`에 모두 의존하는, ES Modules 기반의 프로젝트입니다.
- 각각의 패키지의 `package.json`과 `index.js` 또는 `index.mjs` 파일을 수정하여, 각각의 `*-my-project`들이 `*-package`에 노출된 함수와 클래스를 활용할 수 있도록 만들어 보세요.

## Advanced

- node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?
