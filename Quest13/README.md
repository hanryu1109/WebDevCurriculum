# Quest 13. 웹 API의 응용과 GraphQL

## Introduction

- 이번 퀘스트에서는 차세대 웹 API의 대세로 각광받고 있는 GraphQL에 대해 알아보겠습니다.

## Topics

- GraphQL
  - Schema
  - Resolver
  - DataLoader
- Apollo

## Resources

- [GraphQL](https://graphql.org/)
- [GraphQL.js](http://graphql.org/graphql-js/)
- [DataLoader](https://github.com/facebook/dataloader)
- [Apollo](https://www.apollographql.com/)

## Checklist

- GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

  > - GraphQL(Graph Query Language)은 Application Programming Interface(API)를 위한 쿼리 언어입니다.
  > - GraphQL API는 클라이언트와 서버 사이에 데이터를 주고받을 수 있는 쿼리 언어와 실행 엔진을 제공하는 API입니다.
  >   GraphQL API는 REST API의 몇 가지 단점을 보완해줍니다.
  > - Over-fetching 및 Under-fetching 문제 해결: 불필요한 데이터나, 필요한 데이터를 받지 못하는 문제를 피할 수 있습니다.
  > - 단일 요청: RESTful API 처럼 여러 엔드포인트와 요청 메소드를 조합하여 요청하는 것과 달리, GraphQL API를 사용하게 되면 클라이언트는 필요한 데이터 필드만 정확히 요청할 수 있으며 여러 엔드포인트를 호출하지 않고도 한 번의 요청(단일 API 호출)으로 모든 데이터를 가져올 수 있습니다.

  ```
  REST API
  → example.com/class
  → example.com/class/{반 index}
  → example.com/class/{반 index}/students
  → example.com/class/{반 index}/students/{학생 index}

  GraphQL
  → example.com/graphql
  (하나의 엔드포인트에 다른 쿼리를 사용해 요청)
  ```

- GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

  > - GraphQL 스키마는 GraphQL API가 제공하는 데이터의 형식과 구조를 정의하는 것입니다.
  > - 스키마는 객체 타입(Object Type), 인터페이스(Interface), 스칼라 타입(Scalar Type), 열거형(Enum Type) 등을 정의할 수 있습니다. 객체 타입은 GraphQL의 핵심 단위로 객체의 필드를 정의하며, 각 필드는 다른 객체 타입이나 스칼라 타입을 반환할 수 있습니다. 인터페이스는 공통 필드와 메소드를 가진 여러 객체 타입을 정의하는데 사용됩니다. 스칼라 타입은 GraphQL API가 반환할 수 있는 기본 데이터 유형을 정의하며, 열거형은 특정한 값을 가지는 상수 집합을 정의합니다.

  ```
  // 객체 타입
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  // interface
  interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }

  type Human implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    starships: [Starship]
    totalCredits: Int
  }

  type Droid implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    primaryFunction: String
  }
  ```

  > - `schema.graphql` 이라는 파일 내에 스키마를 작성하게 되며 사용할 Query(데이터를 가져오기 위한 필드)나 Mutation(데이터를 생성, 수정, 삭제하기 위한 필드를 가집니다), type 등을 정의합니다.
  > - 사용자는 추후에 쿼리문을 작성할 때, 스키마에 정의된 대로 argument 등을 정확히 맞추어 요청해야 합니다.

  ```js
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Query {
      getUser(id: ID!): User
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      // ...
    }
  ```

  > - 이렇게 정의된 스키마는 GraphQL 서버에서 사용됩니다. 클라이언트는 이 스키마를 통해 요청할 필드를 선택하고, 요청 결과를 받게 됩니다.

- GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

  > - GraphQL 리졸버는 GraphQL API에서 클라이언트의 요청에 대해 어떻게 응답할지를 결정하는, 클라이언트의 쿼리에 응답하기 위헤 데이터를 제공하는 함수입니다. 리졸버는 각각의 필드에 대한 데이터를 가져오는 책임을 가지며, 서버에서 데이터를 조회, 계산 또는 다른 작업을 수행한 다음 클라이언트에게 반환합니다.
  > - GraphQL 리졸버는 스키마에서 정의한 필드와 1:1로 매핑됩니다. 스키마에서 정의한 각각의 필드마다, 함수를 하나씩 구현한다고 생각하면 됩니다.

  ```js
  const resolvers = {
    Query: {
      user: (parent, args) => {
        // 데이터베이스에서 args.id에 해당하는 유저 정보를 조회하여 반환
        return database.getUser(args.id);
      },
    },
    User: {
      id: (parent) => parent.id,
      name: (parent) => parent.name,
      email: (parent) => parent.email,
      age: (parent) => parent.age,
    },
  };
  ```

  > - 위 코드에서 resolvers 객체는 리졸버 함수들을 포함하고 있습니다.
  > - 리졸버는 첫 번째 인수로 부모 객체, 두 번째 인수로는 인자, 세번째 인수로는 컨텍스트를 받습니다. 부모 객체는 현재 필드의 상위 객체를 나타내고, 인자는 현재 필드에 전달된 인자를 나타냅니다. 컨텍스트는 모든 리졸버에서 공유하는 객체로, 인증 정보나 데이터베이스 연결과 같은 전역적인 정보를 저장할 수 있습니다.

- GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

  > - DataLoader는 일괄 처리 또는 캐싱을 통해서 그에 대한 비용을 줄이고 쿼리의 실행속도를 높여주는 유틸리티 라이브러리입니다. 즉 성능 최적화를 위한 도구입니다.
  > - GraphQL에서 여러 개의 데이터를 가져와야 하는 경우, 데이터 로딩 과정에서 발생하는 N+1 문제를 해결하기 위해 DataLoader를 사용할 수 있습니다.
  > - N+1 문제란 여러 개의 객체를 가져올 때 각 객체마다 새로운 데이터베이스 쿼리를 발생시켜야 하는 상황에서 발생하는 성능 문제입니다.

  - 추가 조사
    N + 1 문제란, 데이터베이스에서 하나의 데이터를 가져오기 위해 여러 개의 쿼리가 실행되어 성능 저하를 일으키는 문제를 말합니다. 즉, 하나의 쿼리를 실행하면서 해당 데이터와 연관된 다른 데이터를 가져오기 위해 추가적인 쿼리가 실행되어야 하는 상황에서 발생하는 문제입니다.

  예를 들어, 게시글을 가져오는 기능이 있다고 가정해봅시다. 이때 게시글을 가져오기 위해 필요한 정보는 게시글 제목, 내용, 작성자, 작성 시간 등이 있습니다. 그리고 해당 게시글의 작성자의 프로필 사진을 함께 출력하고 싶다고 하면, 게시글을 가져오는 쿼리와 작성자의 프로필 사진을 가져오는 쿼리를 따로 실행해야 합니다. 이때 N + 1 문제가 발생합니다.

  이를 해결하기 위해서는 조인(JOIN) 기능을 이용하여 한 번에 필요한 모든 데이터를 가져올 수 있습니다.

  ```js
  const DataLoader = require("dataloader");
  const { getBooksByIds, getAuthorsByBooksId } = require("./db");

  const booksLoader = new DataLoader(getBooksByIds);
  const authorLoader = new DataLoader(getAuthorsByBooksId);

  const resolvers = {
    Query: {
      books: (root, args, context, info) => {
        // 책 리스트 가져오기
        return booksLoader.loadMany(args.ids);
      },
    },
    Book: {
      author: (book, args, context, info) => {
        // 저자 가져오기
        return authorLoader.load(book.id);
      },
    },
  };
  ```

- 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

  > - GraphQL API를 호출할 때 Apollo Client 라이브러리를 사용할 수 있습니다.

  ```js
  import { ApolloClient, gql } from "@apollo/client";

  const client = new ApolloClient({
    uri: "https://knowre.com/",
  });

  const query = gql`
    query GetUser($userId: ID!) {
      user(id: $userId) {
        name
        email
        posts {
          title
          content
        }
      }
    }
  `;

  client
    .query({
      query: query,
      variables: { userId: 123 },
    })
    .then((response) => {
      const data = response.data;
      // 서버 응답 처리
    })
    .catch((error) => {
      console.error(error);
    });
  ```

- Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?
  > - Apollo 프레임워크를 사용하면 GraphQL API를 쉽고 빠르게 개발할 수 있습니다. Apollo Client는 클라이언트 측에서, Apollo Server는 서버 측에서 사용되며, 두 라이브러리는 서로 호환성이 좋아서 함께 사용하기 용이합니다. 강력한 캐싱 기능, 데이터 관리, 플러그인 시스템, 쿼리 최적화, 타입 시스템, 데이터 소스, 스키마 정의 등의 장점이 있습니다.
- Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

  > - HTTP 클라이언트 라이브러리 (Fetch, Axios 등)를 사용하여 GraphQL 서버에 요청을 보낼 수 있습니다.
  > - `fetch()` 메소드를 사용하여 요청을 보낼 수 있습니다. `fetch()`를 사용하여 REST API 요청을 보내는 것과 비슷한 방식으로 GraphQL 요청을 보낼 수 있습니다.

  ```js
  const query = `
    query {
      user(id: 123) {
        id
        name
        age
      }
    }
  `;

  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  ```

- GraphQL 기반의 API를 만들 때 에러처리와 HTTP 상태코드 등은 어떻게 하는게 좋을까요?

  > - GraphQL API에서는 일반적으로 다음과 같은 방식으로 에러를 처리합니다.
  > - 1. HTTP 상태 코드를 사용하여 일반적인 HTTP 에러를 나타냅니다. (200: 성공, 400: 잘못된 요청, 500: 서버에서 처리중 에러)
  > - 2. JSON 응답에서 errors 필드(보통 GraphQL 스키마에는 errors 필드가 배열 형태로 정의되어 있습니다.)를 사용하여 GraphQL 에러를 나타냅니다

  ```
  // graphql 에러 형식
  {
  "data": {
      "root_field": ...
    },
    "errors": [
      { "message": "error message", "locations": [], "path": [] }
    ]
  }

  // 에러 코드 예시
  {
    "errors": [
      {
        "message": "로그인을 해주세요.",
        "extensions": {
          "code": "auth_not_logged_in"
        }
      }
    ],
    "data": null
  }

  ```

## Quest

- 메모장의 서버와 클라이언트 부분을 GraphQL API로 수정해 보세요.

## Advanced

- GraphQL이 아직 제대로 수행하지 못하거나 불가능한 요구사항에는 어떤 것이 있을까요?
  > - File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 위해서는 외부 서비스에 의존하거나 복잡해질 수 있습니다.
  > - 복잡한 쿼리 처리
  > - GraphQL를 사용할 경우 HTTP 캐싱을 사용하기 어렵습니다. HTTP의 캐싱 전략은 각각의 URL에 저마다의 정책을 설정하는데, GraphQL은 하나의 URL 엔드포인트를 갖게 구현하기 때문입니다. 그래서 GraphQL에서는 GraphQL만의 캐싱 방식을 사용해야 합니다.
- GraphQL의 경쟁자에는 어떤 것이 있을까요? (검증 다시 해보기)
  > - Top 10 Alternatives to GraphQL
  >   Neo4j Graph Database.
  >   Redis.
  >   Azure Cosmos DB.
  >   Aerospike.
  >   ArangoDB.
  >   OrientDB.
  >   Elastic Stack.
  >   Amazon Neptune.
