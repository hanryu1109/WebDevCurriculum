class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  // init: 처음에 생겨날 아이콘과 폴더의 개수를 받을 수 있습니다.
  // 여러 개의 바탕화면을 각각 다른 DOM 엘리먼트에서 동시에 운영할 수 있기 때문에 어떤 dom element인지 알아야 합니다.
  // 변수로는: 폴더 갯수, 아이콘 갯수, makeFolder, makeIcon
  #numOfFolder;
  #numOfIcon;

  constructor(numOfFolder, numOfIcon) {
    this.#numOfFolder = numOfFolder;
    this.#numOfIcon = numOfIcon;
  }
}

class Icon {
  /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  // mousedown, mouseout 시에 moveIcon
  openWindow() {}
  moveIcon() {}
}

class Folder {
  /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  // mousedown, mouseout 시에 moveFolder
  // double 클릭 이벤트 발생시 openFolder
  openWindow() {}
  moveFolder() {}
}

class Window {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  // 마우스 다운, 마우스 아웃 시에 moveWindow
  constructor() {}

  moveWindow() {}
}
