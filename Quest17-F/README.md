# Quest 17-F. 번들링과 빌드 시스템

## Introduction

- 이번 퀘스트에서는 현대적 웹 클라이언트 개발에 핵심적인 번들러와 빌드 시스템의 구조와 사용 방법에 대해 알아보겠습니다.

## Topics

- Webpack
- Bundling
  - Data URL
- Transpiling
  - Source Map
- Hot Module Replacement

## Resources

- [Webpack](https://webpack.js.org/)
- [Webpack 101: An introduction to Webpack](https://medium.com/hootsuite-engineering/webpack-101-an-introduction-to-webpack-3f59d21edeba)

## Checklist

- 여러 개로 나뉘어진 자바스크립트나 이미지, 컴포넌트 파일 등을 하나로 합치는 작업을 하는 것은 성능상에서 어떤 이점이 있을까요?

  > - http 통신은 상태가 없기 때문에 매번 요청을 할때마다 connection이라는 네트워크 비용이 듭니다.
  > - 파일을 여러개로 나누어서 가져오게 되면 불필요한 네트워크 요청비용이 추가로 들기 때문에 하나의 파일로 만들어서 네트워크 비용을 아낄 수 있습니다.
  > - 파일압축과 난독화를 통해서 공백문자를 제거해서 파일자체의 용량도 줄일 수 있는 장점이 있습니다.

  - 이미지를 Data URL로 바꾸어 번들링하는 것은 어떤 장점과 단점이 있을까요?

    > - 이미지를 Data URL로 불러오안다는 것은 filesystem에서 imagefile을 불러올 때 URL string으로 불러오는 방식을 의미합니다.
    > - image를 URL data로 변환할 경우 base64로 인코딩된 형식이며, 이를 임베드하여 image/jpeg 파일을 불러올 수 있게 됩니다.
    > - 장점: HTTP 요청의 횟수이 줄어들어 결과적으로 빠르게 로딩됩니다.
    > - 단점: 원본 이미지파일에 비해서 data url로 변환했을때 데이터 용량이 커질수 있습니다.(30% 정도)
    > - 하나의 이미지 파일을 불러올때는 이미지를 캐싱해서 사용할수 있지만 번들링할 경우 이미지 자체를 캐싱 할수 없습니다.

    ```html
    // 외부 이미지 사용 (최적화 전) .btn {background:
    url('../img/arrow_top.png') no-repeat 0 0;}
    <img src="../img/arrow_top.png" />

    // 이미지를 Base64로 변환하여 사용 (최적화 후) .btn{background:
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAHBJREFUKBVjYBimICwsLAaEsXmPGV0QqnAeUNxfW1v7/tWrVy8hq0HRgKQ4CahoIxDPQ9cE14CseNWqVUtAJoMUo2tiBFkXGRmp9/fv3zNAZhJIMUgMBmAGMTMzmyxfvhzhPJAmmCJ0Gp8cutqhwAcASWgwk+79LiQAAAAASUVORK5CYII=')
    no-repeat 0 0;}

    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAYAAAAbvf3sAAAAAXNSR0IArs4c6QAAAHBJREFUKBVjYBimICwsLAaEsXmPGV0QqnAeUNxfW1v7/tWrVy8hq0HRgKQ4CahoIxDPQ9cE14CseNWqVUtAJoMUo2tiBFkXGRmp9/fv3zNAZhJIMUgMBmAGMTMzmyxfvhzhPJAmmCJ0Gp8cutqhwAcASWgwk+79LiQAAAAASUVORK5CYII="
    />
    ```

- Source Map이란 무엇인가요? Source Map을 생성하는 것은 어떤 장점이 있을까요?
  > - 소스 맵(Source Map)이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능입니다. 보통 서버에 배포를 할 때 성능 최적화를 위해 HTML, CSS, JS와 같은 웹 자원들을 압축합니다. 그런데 만약 압축하여 배포한 파일에서 에러가 난다면 소스 맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인할 수 있습니다. 이러한 편의성을 제공하는 것이 소스 맵입니다.
  > - ts나 babel등을 이용해서 트랜스파일링이 되면서 코드의 구조가 변경되는데 변경된 파일을 이용해서는 디버깅이 매우 어렵기 때문에 소스맵을 통해 맵핑된 원본파일을 이용해서 브라우저 환경에서 break point를 걸어서 디버깅하기가 수월합니다.
  ```js
  // 소스맵 설정
  // webpack.config.js
  module.exports = {
    devtool: "cheap-eval-source-map",
  };
  ```
- Webpack의 필수적인 설정은 어떤 식으로 이루어져 있을까요?

  > - Entry: webpack이 번들(빌드)를 시작하는 지점이자 경로입니다. entry 객체를 통해 모듈을 로딩하고 하나의 파일로 묶습니다.

  ```js
  module.exports = {
    //...
    entry: {
      home: "./home.js",
      about: "./about.js",
      contact: "./contact.js",
    },
  };
  ```

  > - Output: entry 객체에 정의된 번들 항목(경로)을 묶은 후, 최종 결과물을 반환할 위치입니다.
  > - Loader: Webpack이 기존 번들할 수 있는 속성(Javascript, JSON)뿐만 아니라, HTML/CSS/Image 등 까지 번들할 수 있도록 관련 기능을 지원해줍니다.
  > - Plugin: Webpack의 기본적인 동작 외 추가적인 기능을 제공합니다. 결과물의 형태를 바꿔주는 기능을 제공하는데, 번들 최적화/환경 변수 주입 등의 작업을 Plugin을 통해 수행할 수 있습니다.

  - Webpack의 플러그인과 모듈은 어떤 역할들을 하나요?

    > - 플러그인: 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성입니다. 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면, 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 됩니다.

    ```js
    // webpack.config.js
    module.exports = {
      plugins: [],
    };
    ```

    > - 플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있습니다. 예를 들어보겠습니다.

    ```js
    // webpack.config.js
    var webpack = require("webpack");
    var HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
    };
    ```

    > - HtmlWebpackPlugin : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
    > - ProgressPlugin : 웹팩의 빌드 진행율을 표시해주는 플러그인

    > - 모듈: 기존 브라우저에서 모듈을 완벽히 지원하지 못하여 이를 보완하기 위해 Webpack에서 제공하는 기능입니다. 브라우저에서는 common js 기반의 모듈을 가져오지 못했는데 이를 보완하기 위해서 esmodule,commonJs 등 여러가지 모듈을 기본적으로 가져와서 번들링할수 있도록 해주고 더 나아가서 로더를 통해서 css,typescript등 여러가지 형태의 파일을 브라우저가 이해할수 있는 형태의 js로 변환하여 모듈로 번들링 할수 있도록 해줍니다.

  - Webpack을 이용하여 HMR(Hot Module Replacement) 기능을 설정하려면 어떻게 해야 하나요?
    > - HMR은 브라우저를 새로 고치지 않아도 웹팩으로 빌드한 결과물이 웹 애플리케이션에 실시간으로 반영될 수 있게 도와주는 설정입니다. 브라우저 새로 고침을 위한 LiveReload 대신에 사용할 수 있으며 웹팩 데브 서버와 함께 사용할 수도 있습니다.
    ```js
    module.exports = {
      devServer: {
        hot: true,
      },
    };
    ```
    > - 데브 서버에 옵션으로 hot:true를 추가하고 자바스크립트나 CSS 스타일시트를 변경하면 해당 모듈이 바로 업데이트가 됩니다. 그리고 화면에서는 브라우저가 다시 로딩되지 않고도 변경된 내용을 확인할 수 있습니다.

## Quest

- 직전 퀘스트의 소스만 남기고, Vue의 Boilerplating 기능을 쓰지 않고 Webpack 관련한 설정을 원점에서 다시 시작해 보세요.
  - 필요한 번들링과 Source Map, HMR 등의 기능이 모두 잘 작동해야 합니다.

## Advanced

- Webpack 이전과 이후에는 어떤 번들러가 있었을까요? 각각의 장단점은 무엇일까요?
  > - Rollup: 장점으로는 번들링한 결과물의 크기가 비교적 작습니다. 기본 설정이 비교적 간단합니다. 단점으로는 input,output이 많아질수록 복잡해질 수 있습니다. 트랜스파일을 하기 위해 플러그인을 사용해야 합니다.
  > - esbuild: 장점으로는 속도가 빠릅니다. 메모리를 효율적으로 사용합니다. 단점으로는 d.ts 생성이 지원되지 않습니다. (별도의 타입 체킹이 이루어지지 않습니다.) 코드 분할 및 CSS 관련 처리가 아직은 미비합니다.
  > - vite: ESM을 이용하여 소스 코드를 제공합니다. 모듈 수정 시 모듈과 관련된 부분만 교체 가능합니다. 번들링 속도에서 큰 메리트가 있습니다. 단점으로는 배포를 위해서는 기존 번들 과정이 필요합니다. 아직 ESM을 프로덕션에 배포하는 것은 비효율적인 부분이 있기 때문입니다. 또한 트리쉐이킹이나 코드 스플리팅과 같은 최적화 기능을 제공하지 않습니다. 따라서 기존의 번들링 기법을 최대한 활용하게 되고 내부적으로는 Rollup을 사용하고 있습니다. 또한 아직까지는 SSR 지원 폭이 좁고 안정성이 떨어집니다.
  > - parcel: 애플리케이션의 크기가 커질수록 속도면에서 유의미한 차이를 보입니다. 별도의 설정파일 없이 다양한 변환을 지원합니다. 단점으로는 Assets 유형으로 번들을 생성하기 때문에 JS 안에 CSS를 포함하도록 하려면 별도의 컴포넌트를 사용해야 합니다. 웹팩이나 롤업에 비해 좁은 생태계를 가지고 있고 안정성이 비교적 떨어집니다.
