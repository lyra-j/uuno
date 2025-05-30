export const ERROR_MESSAGES = {
  LOGIN_ERROR: '로그인 에러 발생',
  SIGNUP_ERROR: '회원가입 에러 발생',
  GOOGLE_SIGNUP_ERROR: '구글 회원가입 에러 발생',
  GOOGLE_SIGNUP_SESSION_ERROR: '구글 세션 에러 발생',
  KAKAO_SIGNUP_ERROR: '카카오 회원가입 에러 발생',
  KAKAO_SIGNUP_SESSION_ERROR: '카카오 세션 에러 발생',
  USERS_TABLE_INSERT_ERROR: 'users 테이블 데이터 삽입 에러 발생',
  NONE_EMAIL_ERROR: ' email 정보가 없는 에러 발생 ',
  EMAIL_DUPLICATED_ERROR: 'email 중복 에러 발생',
  NICKNAME_DUPLICATED_ERROR: 'nickname 중복 에러 발생',
  GET_USER_DATA_ERROR: '사용자 정보를 불러오지 못했습니다.',
  LOGOUT_ERROR: '로그아웃 할 유저 정보가 없습니다.',
  SYSTEM_ERROR: '예기치 못한 시스템 에러 발생',
};

export const COMPLETE_MESSAGE = {
  LOGIN_COMPLETE: '로그인이 되었습니다!',
  SIGNUP_ERROR: '성공적으로 회원가입이 되었습니다!',
  LOGOUT_COMPLETE: '로그아웃 되었습니다!',
};

export const VALIDATE = {
  INVALID_EMAIL: '유효하지 않은 이메일 형식입니다.',
  DUPLICATED_EMAIL: '중복된 이메일 입니다.',
  DUPLICATED_NICKNAME: '중복된 닉네임 입니다.',
  VALID_EMAIL: '사용 가능한 이메일 입니다.',
  VALID_NICKNAME: '사용 가능한 닉네임 입니다.',
  INVALID_USER: '로그인 정보가 맞지 않습니다.',
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  MIN_PASSWORD_LENGTH: 5,
  MAX_PASSWORD_LENGTH: 15,
  MIN_PASSWORD_MESSAGE: '비밀번호는 최소 5글자 이상이어야 합니다',
  MAX_PASSWORD_MESSAGE: '비밀번호는 15글자 이하이어야 합니다',
  STRING_PASSWORD_REGEX: /[a-zA-Z]/,
  NUMBER_PASSWORD_REGEX: /\d/,
  STRING_PASSWORD_MESSAGE: '문자를 포함해야 합니다',
  NUMBER_PASSWORD_MESSAGE: '숫자를 포함해야 합니다',
  MIN_NICKNAME_LENGTH: 2,
  MAX_NICKNAME_LENGTH: 8,
  MIN_NICKNAME_MESSAGE: '닉네임은 최소 2글자 이상이어야 합니다',
  MAX_NICKNAME_MESSAGE: '닉네임은 8글자 이하이어야 합니다',
};
