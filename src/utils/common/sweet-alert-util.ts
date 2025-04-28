import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

/**
 * 기본 확인 대화상자 옵션 타입
 */
interface ConfirmOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  customOptions?: SweetAlertOptions;
}

/**
 * 삭제 확인 대화상자 옵션 타입
 */
interface DeleteConfirmOptions {
  title?: string;
  text?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  customOptions?: SweetAlertOptions;
}

/**
 * 입력 대화상자 옵션 타입
 */
interface InputOptions {
  title?: string;
  text?: string;
  inputPlaceholder?: string;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  customOptions?: SweetAlertOptions;
}

/**
 * 토스트 메시지 옵션 타입
 */
interface ToastOptions {
  title?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  timer?: number;
  customOptions?: SweetAlertOptions;
}

/**
 * 기본 SweetAlert 유틸리티
 * 다양한 알림 유형을 제공하는 재사용 가능한 모듈
 */
const sweetAlertUtil = {
  /**
   * 기본 확인 대화상자
   */
  confirm: ({
    title = '확인',
    text = '계속 진행하시겠습니까?',
    icon = 'question',
    onConfirm = () => {},
    onCancel = () => {},
    customOptions = {},
  }: ConfirmOptions = {}): Promise<boolean> => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      ...customOptions,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        onConfirm();
        return true;
      } else {
        onCancel();
        return false;
      }
    });
  },

  /**
   * 삭제 확인 대화상자
   */
  confirmDelete: ({
    title = '삭제 확인',
    text = '삭제된 항목은 복구할 수 없습니다.',
    onConfirm = () => {},
    onCancel = () => {},
    customOptions = {},
  }: DeleteConfirmOptions = {}): Promise<boolean> => {
    return sweetAlertUtil.confirm({
      title,
      text,
      icon: 'warning',
      confirmButtonText: '삭제',
      onConfirm,
      onCancel,
      customOptions: {
        confirmButtonColor: '#3085d6',
        ...customOptions,
      },
    });
  },

  /**
   * 성공 메시지
   */
  success: (
    title: string = '성공',
    text: string = '',
    customOptions: SweetAlertOptions = {}
  ): Promise<SweetAlertResult> => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: '확인',
      confirmButtonColor: '#3085d6',
      ...customOptions,
    });
  },

  /**
   * 에러 메시지
   */
  error: (
    title: string = '오류',
    text: string = '문제가 발생했습니다.',
    customOptions: SweetAlertOptions = {}
  ): Promise<SweetAlertResult> => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#d33',
      ...customOptions,
    });
  },

  /**
   * 정보 메시지
   */
  info: (
    title: string = '안내',
    text: string = '',
    customOptions: SweetAlertOptions = {}
  ): Promise<SweetAlertResult> => {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: '확인',
      confirmButtonColor: '#3085d6',
      ...customOptions,
    });
  },

  /**
   * 입력 대화상자
   */
  input: ({
    title = '입력',
    text = '',
    inputPlaceholder = '',
    onConfirm = (value: string) => {},
    onCancel = () => {},
    customOptions = {},
  }: InputOptions = {}): Promise<string | null> => {
    return Swal.fire({
      title,
      text,
      input: 'text',
      inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      ...customOptions,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed && result.value) {
        onConfirm(result.value);
        return result.value;
      } else {
        onCancel();
        return null;
      }
    });
  },

  /**
   * 토스트 메시지
   */
  toast: ({
    title = '',
    icon = 'success',
    position = 'top-end',
    timer = 3000,
    customOptions = {},
  }: ToastOptions = {}): Promise<SweetAlertResult> => {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    return Toast.fire({
      icon,
      title,
      ...customOptions,
    });
  },
};

export default sweetAlertUtil;
