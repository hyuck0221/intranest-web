# IntraNest 웹

IntraNest 소개, 설치와 설정 가이드, 이용약관, 개인정보 처리방침을 제공하고 팀의 서버에 연결하는 공개 웹사이트입니다.

**현재 버전:** `0.1.0`  
**언어:** [English](README.md)

## 이 웹사이트에서 할 수 있는 일

- 인트라넷 PC에 공유 링크, 채팅, 파일을 저장하는 IntraNest를 알아봅니다.
- 서버와 Chrome 확장 프로그램 설치 가이드, 이용약관, 개인정보 처리방침을 확인합니다.
- 관리자 페이지를 열어 팀의 IntraNest 서버에 브라우저를 직접 연결합니다.
- 공유 링크와 파일, 채팅, 채팅 기록 보관 기간을 관리합니다.

웹사이트는 사용자가 직접 설치한 서버에 연결하는 정적 안내 페이지입니다. 팀 콘텐츠를 중계하거나 별도의 IntraNest 서버를 실행하지 않습니다. 관리자 페이지는 서버 주소를 이 브라우저에 저장하고, 접근 키는 현재 탭 세션에만 보관합니다.

## 팀 서버에 연결하기

서버 호스트에게 인트라넷 주소와 팀 접근 키를 받은 다음 **관리자 페이지 열기**를 선택하세요. `http://192.168.1.40:8080`과 같은 주소와 키를 입력하면 서버 API를 확인한 뒤 공유 콘텐츠를 표시합니다. Chrome이 웹사이트의 로컬 네트워크 접근을 허용해 달라고 요청할 수 있습니다.

호스팅한 웹 주소에서 관리자 페이지를 사용하려면 서버의 `INTRANEST_CORS_ORIGINS`에 해당 사이트 origin을 정확히 추가해야 합니다. 서버와 브라우저도 인트라넷에서 서로 연결할 수 있어야 합니다.

## 가이드 확인

- [설치 가이드](public/guide.html)
- [이용약관](public/terms.html)
- [개인정보 처리방침](public/privacy.html)
- [서버 릴리스](https://github.com/hyuck0221/intranest-server/releases)
- [Chrome 확장 프로그램 릴리스](https://github.com/hyuck0221/intranest-extensions/releases)

## 웹사이트 제공하기

[GitHub Releases](https://github.com/hyuck0221/intranest-web/releases)에서 최신 ZIP을 내려받아 압축을 풀고 HTTPS를 지원하는 정적 웹 호스트에 파일을 올리세요. 서버의 `INTRANEST_CORS_ORIGINS`에 웹사이트 origin을 설정합니다. 팀 컴퓨터에 이 웹사이트를 설치할 필요는 없습니다.

## 버전 배포

루트의 `version` 파일이 이 프로젝트 버전을 관리합니다. `master`에 push할 때 현재 버전이 최신 릴리스보다 높으면 빌드한 웹사이트 ZIP을 GitHub Release에 올립니다. 서버, 웹, 확장 프로그램 버전은 각각 따로 관리합니다.
