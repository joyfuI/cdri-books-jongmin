# cdri-books-이종민

## 프로젝트 개요

씨디알아이 프론트 사전과제입니다. 빠른 구현을 위해 디자인 구현은 Codex를 사용했습니다.

## 실행 방법 및 환경 설정

`.env` 파일 생성 후 다음 책검색 API 키 입력

```dotenv
VITE_REST_API_KEY=<REST_API_KEY>
```

```bash
# 의존성 설치
npm ci

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 서버 실행
npm run preview
```

## 폴더 구조 및 주요 코드 설명

```text
.
└─ src/                              # 소스 코드
   ├─ api/                           # API 코드
   │  └─ getSearchBook.ts            # 다음 책검색 API
   ├─ components/                    # UI 컴포넌트
   │  ├─ AdvancedSearchButton.tsx    # 상세검색 컴포넌트
   │  ├─ BookCover.tsx               # 책커버 이미지 컴포넌트(+찜하기)
   │  ├─ BookItem.tsx                # 책 컴포넌트
   │  └─ Header.tsx                  # 헤더 컴포넌트
   ├─ hooks/                         # 훅
   │  └─ query/                      # tanstack-query 훅
   ├─ images/                        # 아이콘 등 이미지
   ├─ utils/                         # 범용 유틸리티
   ├─ router.tsx                     # react-router 라우터 정의
   ├─ Search.tsx                     # 도서 검색 페이지
   └─ Wishlist.tsx                   # 내가 찜한 책 페이지
```

## 라이브러리 선택 이유

- `react`: 필수 스택
- `typescript`: 필수 스택
- `tanstack-query`: 필수 스택
- `antd`: 채용 공고에 있었고, 버튼 디자인이 유사해보여서 선택했습니다. 마침 사용 경험이 있습니다.
- `tailwindcss`: 채용 공고에 있었고, antd와 다른 디자인에 사용하기 위해 선택했습니다.
- `react-router`: 현재 개인적으로 tanstack-router를 사용하는 중인데 아직 프로덕션에서는 react-router가 더 흔한 것 같아 선택했습니다. 최근에 Framework 모드가 생겼지만, 빠른 적용을 위해 이전에 사용해 본 적있는 Data 모드를 사용했습니다.
- `nuqs`: 검색 파라미터를 상태로 관리하기 위해 선택했습니다.
- `biome`: 현재 개인적으로 biome을 사용하는 중이라 빠른 적용을 위해 Prettier+ESLint 대신 선택했습니다.

## 강조 하고 싶은 기능

과제 내용을 충실히 구현하는데 집중해서 특별히 강조하고 싶은 기능은 없습니다.\
디자인 구현은 Codex를 사용했음을 알려드립니다. 로직은 직접 구현하였으며, 디자인 구현 과정에서 Codex가 생성한 껍데기 로직들도 충분히 코드 이해 후 반영했습니다.\
URL로 상태 관리하는 걸 좋아해서 nuqs 라이브러리를 도입했습니다. URL로 상태 관리하면 브라우저 히스토리도 남길 수 있고 다른 사람에게 검색 결과를 공유할 때도 유용합니다.
