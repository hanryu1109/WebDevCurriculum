# Quest 00. 형상관리 시스템

## Introduction

- git은 2021년 현재 개발 생태계에서 가장 각광받고 있는 버전 관리 시스템입니다. 이번 퀘스트를 통해 git의 기초적인 사용법을 알아볼 예정입니다.

## Topics

- git
  - `git clone`, `git add`, `git commit`, `git push`, `git pull`, `git branch`, `git stash` 명령
  - `.git` 폴더
- GitHub

## Resources

- [Resources to learn Git](https://try.github.io)
- [Learn Git Branching](https://learngitbranching.js.org/?locale=ko)
- [Inside Git: .Git directory](https://githowto.com/git_internals_git_directory)

## Checklist

- 형상관리 시스템은 왜 나오게 되었을까요?
  > 파일이나 폴더에 수정사항이 발생했을 때 버전을 일일이 수동적으로 관리해야했습니다. 이러한 불편함을 해소하기 위해서 형상관리 시스템이 등장했습니다.
- git은 어떤 형상관리 시스템이고 어떤 특징을 가지고 있을까요? 분산형 형상관리 시스템이란 무엇일까요?
  > git은 Distributed Version Control(DVC) 분산형 형상관리 시스템입니다. 분산형 형상관리 시스템은 서버(remote)에만 히스토리 정보가 있는 것이 아니라 개발자들이 로컬에도 동일한 히스토리 정보를 가질 수 있는 특징이 있습니다. 분산된 시스템을 이용하게 되면 서버에 문제가 생기거나 다운이 되어도 각각의 개발자들이 동일한 히스토리를 가지고 있기 때문에 서로의 정보를 이용해서 서버를 보관하고 계속 일을 이어나갈 수 있습니다.
  - git은 어떻게 개발되게 되었을까요? git이 분산형 시스템을 채택한 이유는 무엇일까요?
    > 리눅스 커널 팀이 버전을 관리할 수 있는 Bitkeeper 라는 시스템을 만들었으나 더 이상 무료로 이용할 수 없게 되었습니다. Linus Torvalds는 분산형인데다 안전하게 정보를 저장할 수 있는 Git을 2005년에 개발했습니다.
- git과 GitHub은 어떻게 다를까요?
  > git은 분산형 버전관리 시스템으로 명령어를 기본으로 한 명령어 프로그램입니다. GitHub은 git을 기반으로 한 웹 호스팅 서비스로, git으로 관리하는 프로젝트를 호스팅하고, 관리하는데 사용됩니다.
- git의 clone/add/commit/push/pull/branch/stash 명령은 무엇이며 어떨 때 이용하나요? 그리고 어떻게 사용하나요?
  > clone: 원격 저장소에 있는 저장소를 로컬로 가져올 때 사용합니다.
  > add: working directory에 있는 작업 내용을 staging area로 옮길 때 사용합니다.
  > commit: stage에 올라온 수정 사항들을 로컬에 있는 .git directory에 올릴 때 사용합니다.
  > push: 로컬에 있는 내용들을 원격으로 옮길 때 사용합니다.
  > pull: git fetch + git merge 가 합쳐진 명령어로 원격에 있는 수정사항들을 반영하기 위해 사용됩니다.
  > branch: 브랜치들을 관리할 때 사용합니다.
  > stash: 수정 사항들을 임시로 저장하고 싶을 때 사용합니다.
- git의 Object, Commit, Head, Branch, Tag는 어떤 개념일까요? git 시스템은 프로젝트의 히스토리를 어떻게 저장할까요?
  > Object: 모든 변경이나 파일을 포함하는 대상
  > Commit:
  > Head: 현재 checkout 된 브랜치를 가리키는 포인터입니다.
  > Branch:
  > Tag: 특정 커밋에 대한 표식으로 Tag를 사용합니다.
- 리모트 git 저장소에 원하지 않는 파일이 올라갔을 때 이를 되돌리려면 어떻게 해야 할까요?

## Quest

- GitHub에 가입한 뒤, [이 커리큘럼의 GitHub 저장소](https://github.com/KnowRe-Dev/WebDevCurriculum)의 우상단의 Fork 버튼을 눌러 자신의 저장소에 복사해 둡니다.
- Windows의 경우 같이 설치된 git shell을, MacOSX의 경우 터미널을 실행시켜 커맨드라인에 들어간 뒤, 명령어를 이용하여 복사한 저장소를 clone합니다.
  - 앞으로의 git 작업은 되도록 커맨드라인을 통해 하는 것을 권장합니다.
- 이 문서가 있는 폴더 바로 밑에 있는 sandbox 폴더에 파일을 추가한 후 커밋해 보기도 하고, 파일을 삭제해 보기도 하고, 수정해 보기도 하면서 각각의 단계에서 커밋했을 때 어떤 것들이 저장되는지를 확인합니다.
- `clone`/`add`/`commit`/`push`/`pull`/`branch`/`stash` 명령을 충분히 익혔다고 생각되면, 자신의 저장소에 이력을 push합니다.

## Advanced

- Mercurial은 어떤 형상관리 시스템일까요? 어떤 장점이 있을까요?
  > Git과 마찬가지로 분산형 형상관리 시스템 중 하나입니다.
  > Mercurial은 Windows 환경에서 Git보다 더 나은 성능을 보여줍니다.
  > Mercurial은 필요하다 싶은 기능 대부분이 이미 번들 활장(Extension)에 포함되어 있습니다.
- 실리콘밸리의 테크 대기업들은 어떤 형상관리 시스템을 쓰고 있을까요?
  > Git, SVN, Mercurial, Perforce
