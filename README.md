# cat-photo-gallery
고양이 사진 갤러리

## 1. 프로젝트 소개
고양이 사진을 검색할 수 있는 간단한 갤러리 사이트 입니다. 
- CRA없이 개발 환경 세팅 
- 검색 자동완성 기능 구현
- debounce 적용하여 검색 시 마지막 입력값 호출
- AWS Amplify를 통해 정적 사이트 배포

🏠 <a href=https://main.d3ccsn9ffqdhel.amplifyapp.com>웹 페이지</a>


## 2. 기술 스택
- `TypeScript` : 정적 타입을 도입하여 코드 안전성 및 유지보수를 쉽게 하기위해 사용
- `React`: 웹UI 라이브러리
- `Redux/tookit` : 클라이언트 전역상태 관리 라이브러리
- `Styled-components` : css-in-js을 통해 컴포넌트 스타일을 관리하기 위해 사용
- `AWS Amplify` : 정적 사이트 배포
- `ESLint` : 코드의 컨벤션 검사를 위해 사용
- `Pretiier` : 코드의 컨벤션 유지를 위해 사용
- `Webpack` : 모듈을 병합하여 하나의 결과물을 만들기 위해 사용
- `Babel` : TSX,Typescript 코드 JS로 변경해주는 트랜스파일러  


## 3. 프로젝트 구조

```ts
│      
├── public                 // Favicon 등 Static Resource 저장
│   ├── favicon.png
│   └── index.html
├── src
│   ├── api                // REST API 사용을 위한 HTTP 서비스, Axios Error Handle
│   ├── assets             // 이미지 및 글로벌 Style 
│   ├── hooks              // Custom Hooks
│   ├── modules            // Redux/toolkit Slice 모음
│   ├── App.tsx
│   └── index.tsx 
├── README.md
├── package.json           // npm 패키지 의존성 파일
├── .env                   // 환경변수 관리 파일
├── .eslintre              // ESLint 설정 파일 - airbnb 컨벤션을 따름
├── .prettierre.js         // Prettier 설정 파일
├── webpack.config.js      // 웹팩 설정 파일
└── yarn.lock              // yarn 패키지 버전관리 파일
```


