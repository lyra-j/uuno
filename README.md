# Uuno: You + uno

![Uuno](https://github.com/user-attachments/assets/b987c497-8698-4e22-8598-84939a4c1813)

## 💻 프로젝트 소개

**Uuno(유노) : You + Uno(하나) → 나를 하나의 카드로 담다, 한 장의 나**

- 드래그 앤 드롭으로 쉽게 만드는 인터랙티브 디지털 명함 서비스
- 템플릿 기반으로 손쉽게 명함 제작할수있습니다.
- 내 명함의 정보가 바뀌어도 쉽게 수정이 가능하며, QR, 이미지, html소스 등으로 공유가 가능합니다.

🔗 [Uuno 배포 사이트](https://uuno.kr/)

### 📆 작업 기간

- 기획 기간 : 2025.03.28 ~ 2025.04.08 <br />
- 개발 기간 : 2025.04.09 ~ 진행중 <br />

<br />
<br />

## 💠 프로젝트 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/lyra-j">
        <img src="https://github.com/lyra-j.png" width="80" alt="MK. Jang"/>
        <br />
        <sub><b>장미경</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/sum529-create">
        <img src="https://github.com/sum529-create.png" width="80" alt="sumin"/>
        <br />
        <sub><b>노수민</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/K-jisu">
        <img src="https://github.com/K-jisu.png" width="80" alt="Jisu Kang"/>
        <br />
        <sub><b>강지수</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/woozizi">
        <img src="https://github.com/woozizi.png" width="80" alt="jongwook choi"/>
        <br />
        <sub><b>최종욱</b></sub>
        </a>
        <br />
      </td>      
      <td align="center">
        <img src="https://github.com/user-attachments/assets/cdf7f505-c4c5-45ce-aa22-288328a256b9" width="80" alt="jeonghwa"/>
        <br />
        <sub><b>최정화</b></sub>
        <br />
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/388af8a4-70ea-4fae-b230-427a4493319e" width="80" alt="huiryeong"/>
        <br />
        <sub><b>서희령</b></sub>
        <br />
      </td>               
    </tr>
    <tr>
      <td width="300px" align="center">
        <b>Team Leader</b>
        <br>Frontend
      </td>
      <td width="300px" align="center">
        <b>Sub Leader</b>
        <br>Frontend
      </td>
      <td width="300px" align="center">
        Frontend
      </td>
      <td width="300px" align="center">
        Frontend
      </td>
      <td width="300px" align="center">
        Designer
      </td>
      <td width="300px" align="center">
        Designer
      </td>
    </tr>
  </tbody>
</table>
<br />
<br />

## ⚙️ 주요 기능

### 🎨 명함 에디터

**- 캔버스기반 인터렉션**
> 드래그&드롭으로 요소를 자유롭게 배치 <br />
> 마우스(또는 터치)로 요소를 직관적으로 이동·크기 조절 <br />
> 실시간 미리보기를 제공하여 편집 즉시 미리보기 제공 <br />

**- 다양한 요소 라이브러리**
> 폰트, 크기, 색상, 자간·행간, 굵기·기울기 등 스타일 제어가 가능한 텍스트를 제공 <br />
> Unsplash를 활용하여 검색 및 삽입이 가능하고 로컬에서 이미지 업로드 기능을 제공 <br />
> 각각의 요소를 캔버스 내 리사이즈, 로테이션 제공 <br />
>소셜 아이콘(QR, SNS)과 클릭 가능한 URL 링크를 제공 <br />

**- 디자인 옵션**

>양면 디자인을 제공하고 앞면/뒷면 전환 및 편집<br />
>가로 세로 모드를 지원하고 사용자가 원하는 방향으로 전환

**- 저장 및 내보내기**

> Konva Stage → DataURL → Blob → Supabase 업로드 방식으로 이미지를 추출 <br />
>전체 디자인을 JSON 형태로 저장·로드 방식으로 템플릿을 저장<br />
>커스텀 슬러그 기반 URL 발급으로 사용자가 원하는 공유 링크를 생성

<br />

### 📝 템플릿 시스템

**- 다양한 디자인 제공**
> 심플·트렌디 스타일 템플릿을 원클릭으로 적용

**- 커스터마이징**
> 색상·레이아웃·폰트 손쉽게 변경 가능

<br />

### ✌️ 인터랙티브 요소

**- 카드 플립 애니메이션**
> 앞면 ↔ 뒷면 부드러운 전환 효과

**- 확장 패널**
> 클릭 시 추가 정보 표시

**- 호버 이펙트**
> 요소별 강조(음영·스케일)

<br />

### 🔄 공유 시스템

**- 고유 URL**
> 각 명함마다 고유한 공유 링크 제공

**- QR 코드**
>스캔 즉시 접속 가능한 QR 코드 생성

**- 카카오톡 공유**
> 오픈 그래프 적용

**- 태그 복사와 이미지 저장**
> 웹사이트/블로그에 삽입하거나 이미지로 저장

<br />

### 📊 통계 분석

**- 조회 통계** 
> 명함 조회수 및 방문자 데이터 확인

**- 인터랙션 분석** 
> 요소별 클릭 수 및 관심도 파악

**- 트래픽 출처 분석** 
> 유입 경로 측정 및 공유 효과 확인

**- 데이터 시각화** 
> 직관적인 그래프와 차트 기반의 대시보드 확인

<br />
<br />

## 🔹 기술적 의사결정

<br />
<br />

## 🔹 트러블 슈팅 & 작업 후기
### 🚀 트러블 슈팅
- [이미지 업로드 시 이미지 로드 실패](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880ab818fd0dc9297b2bc&pm=s)
- [모달 트러블슈팅: 첫 클릭 시 닫히는 현상 해결](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e847058808bab37ffaf8fa09a7e&pm=s)
- [Storage는 변경되었는데, 왜 브라우저에는 이전 이미지일까](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880459e06dc5f073f2904&pm=s)
- [Undo/Redo 기능 구현에 대한 고민](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e847058805dbf70c5b5a4e88105&pm=s)
- [toBlob() null 반환 이슈와 이미지 CORS 해결기](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880bcb411cdb052d37577&pm=s)
- [Canvas 좌표와 HTML 좌표가 다르다고??](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880d5a646fc21304aeb3d&pm=s)
- [서버액션과 로컬스테이트, 옵티미스틱](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880c4b598fb529638548f&pm=s)
- [React + Konva에서 forwardRef 사용 시 TypeScript 오류](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880a29557fec930d3ffb8&pm=s)

### 💡 Uuno 프로젝트 작업 후기
- [🐳 장미경](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e8470588001932ae1b819a1820d&pm=s)
- [🌸 노수민](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880b59ac0c25138b89b54&pm=s)
- [🫠 강지수](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e84705880acabffd6c0e4b9355b&pm=s)
- [❤️ 최종욱](https://www.notion.so/Uuno-2-_Project-Uuno-1e4d8e84705880cfaa4ad3e600e80644?p=1e5d8e8470588012893ef20663ddbbe5&pm=s)

<br />
<br />

## 🧰 기술 스택

<div align="left">

### 패키지 매니저

<img src="https://camo.githubusercontent.com/59140240b23053fefd4261622bb6e83b862ef6b3426278847d48f2b8ac5dd72d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706e706d2d4636393232303f7374796c653d666f722d7468652d6261646765266c6f676f3d706e706d266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&amp;logo=pnpm&amp;logoColor=white" style="max-width: 100%;">

### 프레임워크 및 라이브러리

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&amp;logo=Typescript&amp;logoColor=white">
<img src="https://img.shields.io/badge/tailwindcss-1daabb.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/konva-0D83CD.svg?style=for-the-badge&logo=konva&logoColor=white" />
<img src="https://img.shields.io/badge/chart.js-FF6384.svg?style=for-the-badge&logo=chartdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&amp;logo=zod&amp;logoColor=white">
<img src="https://img.shields.io/badge/reacthookform-EC5990?style=for-the-badge&amp;logo=reacthookform&amp;logoColor=white">
<img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&amp;logo=ShadcnUi&amp;logoColor=white">

### 상태 관리

<img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">

### 데이터베이스 및 인증

<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&amp;logo=Supabase&amp;logoColor=white">

### 모니터링

<img src="https://img.shields.io/badge/sentry-362D59?style=for-the-badge&amp;logo=sentry&amp;logoColor=white">

### 배포 및 CI

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white">

### 협업

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<img src="https://camo.githubusercontent.com/3647bba9752f84cfcb4ec225305451a376726a52123cc7ac2e6f689fde749452/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f74696f6e2d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d4e6f74696f6e266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&amp;logo=Notion&amp;logoColor=white" style="max-width: 100%;">
<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" />

<br />
<br />

## 📁 프로젝트 구조

```markdown
📁uuno
├── public # 정적 파일 (브라우저 직접 접근 가능)
│
├── src
│ ├── apis/ # API 요청 관련 함수
│ ├── app/  
│ │ ├── [...slug]/ # 슬러그 기반 명함 상세 페이지
│ │ ├── api/ # API route handlers
│ │ ├── auth/ # 인증 관련 라우트
│ │ ├── card/ # 카드 단일 상세 페이지
│ │ ├── dashboard/ # 대시보드 및 하위 페이지
│ │ ├── editor/ # 명함 편집기 (에디터)
│ │ └── template-list/ # 템플릿 선택 화면
│ │
│ ├── components/
│ │ ├── auth/ # 로그인/회원가입 컴포넌트
│ │ ├── card/ # 카드 공유/저장/플립 컴포넌트
│ │ ├── card-detail/ # 카드 통계/분석용 컴포넌트
│ │ ├── chart/ # 차트 관련 UI
│ │ ├── common/ # 공통 버튼, 모달 등 UI
│ │ ├── dashboard/ # 대시보드용 카드 리스트 등
│ │ ├── editor/ # 명함 에디터의 주요 UI
│ │ ├── icons/ # 커스텀 아이콘 SVG 컴포넌트
│ │ ├── layouts/ # Header, NavBar 등 Layout 컴포넌트
│ │ ├── main/ # 메인페이지 구성 컴포넌트
│ │ ├── modals/ # 인증 관련 모달
│ │ ├── template-list/ # 템플릿 카드 및 탭 버튼
│ │ └── ui/ # shadcn-ui 기반 UI 컴포넌트
│ │
│ ├── constants/ # 상수 정의
│ ├── hooks/ # 커스텀 훅
│ │ ├── queries/ # TanStack Query 기반 훅
│ │ └── mutations/ # 데이터 수정 관련 훅
│ │
│ ├── lib/ # 라이브러리성 유틸리티
│ ├── providers/ # context, query provider
│ ├── store/ # Zustand 상태 관리
│ ├── types/ # TypeScript 타입 정의
│ └── utils/ # 공통 유틸 함수들
│
...
```
