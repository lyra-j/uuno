/**
 * 컬러칩 설정
 * primary 컬러는 shadcn과 공유하고 있어 기존 tailwind.config.ts 에서 확인
 */

const uunoColors = {
  // 기본 색상
  black: '#1A1A1A',
  white: '#FFFFFF',
  bg: '#F5F5F7',
  error: '#FF1C1C',

  // 회색 계열
  gray: {
    '5': '#F4F4F5',
    '10': '#E1E2E4',
    '20': '#DBDCDF',
    '30': '#C2C4C8',
    '40': '#AEB0B6',
    '50': '#989BA2',
    '60': '#878A93',
    '70': '#70737C',
    '80': '#5A5C63',
    '90': '#46474C',
    '100': '#37383C',
  },

  // 조회수/막대 차트 색상
  chart1: {
    increase: '#009DD6', // 명함 상세 - 조회 수/증가
    same: '#00B69B', // 명함 상세 - 조회 수/동일
    decrease: '#F93C65', // 명함 상세 - 조회 수/하락
    tag: '#FFD548', // 명함 상세 - 막대차트/Tag
    qr: '#FFA69B', // 명함 상세 - 막대차트/QR
    link: '#657AFF', // 명함 상세 - 막대차트/Link
    direct: '#00D7C0', // 명함 상세 - 막대차트/Direct
  },

  // 도넛 차트 색상
  chart2: {
    insta: '#6792CF', // 원형 그래프/인스타
    github: '#6FD7AE', // 원형 그래프/깃 허브
    linkedin: '#8690EE', // 원형 그래프/링크드인
    image: '#FF7800', // 원형 그래프/이미지 저장
    kakao: '#FFB30A', // 원형 그래프/카카오톡
    notion: '#64B0F9', // 원형 그래프/노션
    vcard: '#FF143F', // 원형 그래프/연락처 저장
    youtube: '#EE86E0', // 원형 그래프/유튜브
    velog: '#7F2A2A', // 원형 그래프/벨로그
  },
};

export default uunoColors;
