# Quest 04. OOP의 기본

## Introduction

- 이번 퀘스트에서는 바닐라 자바스크립트의 객체지향 프로그래밍에 대해 알아볼 예정입니다.

## Topics

- 객체지향 프로그래밍
  - 프로토타입 기반 객체지향 프로그래밍
  - 자바스크립트 클래스
    - 생성자
    - 멤버 함수
    - 멤버 변수
  - 정보의 은폐
  - 다형성
- 코드의 재사용

## Resources

- [MDN - Classes](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)
- [MDN - Inheritance and the prototype chain](https://developer.mozilla.org/ko/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN - Inheritance](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance)
- [Polymorphism](https://medium.com/@viktor.kukurba/object-oriented-programming-in-javascript-3-polymorphism-fb564c9f1ce8)
- [Class Composition](https://alligator.io/js/class-composition/)
- [Inheritance vs Composition](https://woowacourse.github.io/javable/post/2020-05-18-inheritance-vs-composition/)

## Checklist

- 객체지향 프로그래밍은 무엇일까요?

  > - 컴퓨터 프로그래밍의 패러다임 중 하나입니다.
  > - 컴퓨터 프로그램을 명령어의 목록으로 보는 시각에서 벗어나 여러 개의 독립된 단위, 즉 "객체" 들의 모임으로 파악하고자 하는 것입니다.
  > - 데이터가 객체 내에 캡슐화되고 구성 요소 부분이 아닌 객체 자체가 운용되는 프로그래밍 방식입니다.

  - `#`로 시작하는 프라이빗 필드는 왜 필요한 것일까요? 정보를 은폐(encapsulation)하면 어떤 장점이 있을까요?

    > - `#` 이 붙으면 클래스 안에서만 접근할 수 있습니다. 클래스 외부나 자손 클래스에서 private에 직접 접근할 수 없습니다. 프라이빗 필드는 필드의 보안을 강화하기 위해 만들어졌습니다. (외부에서 의도치 않게 클래스를 조작하게되면 결과를 예측하기 어렵습니다.)
    > - 정보 은페(encapsulation)는 객체의 상태와 행동을 외부에 노출하지 않고 캡슐화하여 객체의 내부 구현을 보호하는 것입니다. 즉, 객체의 내부 구현을 변경해도 외부 코드에 영향을 주지 않는 것입니다.
    > - 프라이빗 필드를 사용하면 해당 필드에 직접 접근하는 것을 막아 정보 은폐를 달성할 수 있습니다. 이로써 외부에서 객체의 상태를 변경하는 것을 제한함으로써 객체의 무결성을 보호하고 객체의 내부 구현을 감춤으로써 다른 코드와의 결합도를 낮출 수 있습니다.

    ```js
    class Person {
      #name; // 프라이빗 필드

      constructor(name) {
        this.#name = name;
      }

      getName() {
        return this.#name; // 프라이빗 필드에 접근하는 메서드
      }

      setName(newName) {
        if (typeof newName === "string" && newName.length > 0) {
          this.#name = newName; // 프라이빗 필드 값을 변경하는 메서드
        }
      }
    }

    const person1 = new Person("John");
    console.log(person1.getName()); // "John"
    person1.#name = "Jane"; // SyntaxError: Private field '#name' must be declared in an enclosing class
    person1.setName("Jane");
    console.log(person1.getName()); // "Jane"
    ```

  - 다형성이란 무엇인가요? 다형성은 어떻게 코드 구조의 정리를 도와주나요?
    > - 하나의 객체가 다양한 타입을 가질 수 있는 능력을 말합니다. 즉, 다른 객체와 같은 인터페이스를 공유하면서도 다른 동작을 하는 객체들이 존재할 수 있는 것을 말합니다.
    > - 동일한 인터페이스를 가진 여러 객체가 있을 때, 이들은 각자 다른 방식으로 구현될 수 있습니다. 이렇게 하나의 인터페이스를 공유하지만, 다양한 구현을 가진 객체들이 있기 때문에 코드의 재사용성이 높아지며, 코드의 유연성도 높아집니다. 예를 들어, 다형성을 이용하여 여러 개의 객체를 한 번에 다룰 수 있는 함수를 만들면, 코드의 중복성을 피하고 유지보수성을 높일 수 있습니다.
  - 상속이란 무엇인가요? 상속을 할 때의 장점과 단점은 무엇인가요?
    > - 하나의 객체가 다른 객체의 특성을 이어받는 것을 말합니다. 상속을 통해 기존의 코드를 재사용하고, 코드의 중복을 줄여서 유지보수성과 코드의 가독성을 높일 수 있습니다.
    > - 상속의 장점은 이미 작성된 코드를 상속받아 새로은 클래스를 작성할 수 있으므로 코드 재사용성 측면에서 좋습니다. 또한 코드가 간결해지므로 유지보수성 측면에서 좋습니다. 마지막으로 상속을 이용하여 작성하면, 코드의 의도를 보다 명확하게 전달할 수 있으므로 가독성 측면에서 좋습니다.
    > - 단점으로는 상속 관계가 복잡해질 경우 구조가 복잡해지고 가독성이 저하될 수 있습니다. 또한 상속은 부모 클래스와 자식 클래시 간의 결합도를 높일 수 있습니다. 이로 인해 클래스 간의 종속성이 높아지며, 변경 시에 다른 클래스에도 영향을 미칠 수 있습니다. 마지막으로 자식 클래스에서 부모 클래스의 메서드를 오버라이딩 하면, 오버라이딩된 메서드가 호출되므로 부모 클래스의 동작을 무시할 수 있습니다. 이로 인해 의도하지 않은 결과가 발생할 수 있습니다.
  - OOP의 합성(Composition)이란 무엇인가요? 합성이 상속에 비해 가지는 장점은 무엇일까요?
    > - 합성이란 중복되는 로직들을 갖는 객체를 구현하고, 이 객체를 주입받아 중복 로직을 호출함으로써 퍼블릭 인터페이스를 재사용하는 방법을 의미합니다.
    > - 합성을 이용하면 객체의 내부는 공개되지 않고 인터페이스를 통해 코드를 재사용하기 때문에 구현에 대한 의존성을 인터페이스에 대한 의존성으로 변경하여 결합도를 낮출 수 있기 때문입니다.
    > - 상속을 이용하면 캡슐화가 깨지고 결합도가 높아지는데, 그 이유는 부모 클래스와 자식 클래스의 관계가 컴파일 시점에 결정되어 구현에 의존하기 때문입니다. 컴파일 시점에 결정되는 관계는 유연성을 상당히 떨어뜨리고, 실행 시점에 객체의 종류를 변경하는 것이 불가능하여 다형성 등과 같은 좋은 객체지향 기술을 사용할 수 없습니다.

- 자바스크립트의 클래스는 어떻게 정의할까요?

  > - `class` 키워드를 사용하여 정의할 수 있습니다.

  ```js
    class MyClass {
      prop = value; // 프로퍼티

      constructor(...) { // 생성자 메서드
        // ...
      }

      method() {} // 메서드

      get something(...) {} // getter 메서드
      set semething(...) {} // setter 메서드
    }
  ```

  - 프로토타입 기반의 객체지향 프로그래밍은 무엇일까요?
    > - 미리 정의된 클래스(class)를 사용하지 않고 기존 객체(object)의 원형인 프로토타입(prototype)을 기반으로 객체를 생성하는 방식을 말합니다.
  - 자바스크립트의 클래스는 이전의 프로토타입 기반의 객체지향 구현과 어떤 관계를 가지고 있나요?
    > - 클래스를 사용하면 기존 프로토타입 기반의 객체 생성 방식과 유사한 방식으로 객체를 생성할 수 있으며, 클래스를 이용하여 생성된 객체는 내부적으로 프로토타입 체인을 통해 상속과 다형성을 구현할 수 있습니다. 하지만 클래스(class)는 기존의 프로토타입 기반(object-based) 객체지향 구현에서는 상속 및 다형성 등을 구현하기 위해 필요한 복잡한 코드를 보다 쉽게 작성할 수 있도록 하였습니다. 또한 클래스(class)는 코드의 가독성을 높이고, 유지보수를 보다 쉽게 할 수 있도록 하였습니다.

## Quest

- 웹 상에서 동작하는 간단한 바탕화면 시스템을 만들 예정입니다.
- 요구사항은 다음과 같습니다:
  - 아이콘은 폴더와 일반 아이콘, 두 가지의 종류가 있습니다.
  - 아이콘들을 드래그를 통해 움직일 수 있어야 합니다.
  - 폴더 아이콘은 더블클릭하면 해당 폴더가 창으로 열리며, 열린 폴더의 창 역시 드래그를 통해 움직일 수 있어야 합니다.
  - 바탕화면의 생성자를 통해 처음에 생겨날 아이콘과 폴더의 개수를 받을 수 있습니다.
  - 여러 개의 바탕화면을 각각 다른 DOM 엘리먼트에서 동시에 운영할 수 있습니다.
  - Drag & Drop API를 사용하지 말고, 실제 마우스 이벤트(mouseover, mousedown, mouseout 등)를 사용하여 구현해 보세요!

## Advanced

- 객체지향의 역사는 어떻게 될까요?
- Smalltalk, Java, Go, Kotlin 등의 언어들로 넘어오면서 객체지향 패러다임 측면에서 어떤 발전이 있었을까요?

## Reference

- [OOP(위키피디아)](https://en.wikipedia.org/wiki/Object-oriented_programming)
- [상속, 합성](https://inpa.tistory.com/entry/OOP-%F0%9F%92%A0-%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5%EC%9D%98-%EC%83%81%EC%86%8D-%EB%AC%B8%EC%A0%9C%EC%A0%90%EA%B3%BC-%ED%95%A9%EC%84%B1Composition-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
- [프로토타입](https://ui.toast.com/weekly-pick/ko_20160603)
