import Swal, { SweetAlertResult } from 'sweetalert2';

/**
 * 이미지와 완벽히 일치하는 SweetAlert
 */
const customSweetAlert = {
  /**
   * 명함 삭제 확인 대화상자
   */
  confirmCardDelete: (
    onConfirm: () => void = () => {},
    onCancel: () => void = () => {}
  ): Promise<boolean> => {
    return Swal.fire({
      // 제목과 내용을 모두 html에 포함 (중앙 정렬 유지)
      html: `
        <div class="flex flex-col items-center">
         <img src="/icons/warning.svg" class="w-[28px] h-[28px]" alt="경고" />
          <div class="text-xl not-italic font-semibold leading-[150%] mb-2 mt-4" style="color: #1a1a1a">이 명함을 삭제하시겠습니까?</div>
          <p class="text-label2-medium" style="color: #70737C">
            삭제된 명함은 되돌릴 수 없습니다.
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소하기',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-xl shadow-md py-5 px-6 max-w-xs bg-white',
        htmlContainer: 'p-0 m-0',
        actions: 'mt-8 flex gap-2',
        confirmButton:
          'py-2 px-3 flex-1 rounded-md bg-blue-600 text-white text-sm font-normal',
        cancelButton:
          'py-2 px-3 flex-1 rounded-md border border-gray-300 bg-white text-black text-sm font-normal',
        closeButton: 'absolute top-2 right-2 text-gray-400',
      },
      showCloseButton: true,
      didOpen: () => {
        // DOM이 생성된 후 직접 조작
        const actionsEl = document.querySelector('.swal2-actions');
        const modalWrapper = document.querySelector('.swal2-modal');
        const swal2HtmlContainer = document.querySelector(
          '#swal2-html-container.swal2-html-container.p-0.m-0'
        );
        const swal2Validation = document.querySelector(
          '.swal2-actions.mt-8.flex.gap-2'
        );

        if (actionsEl) {
          (actionsEl as HTMLElement).style.width = '100%';
        }
        if (swal2HtmlContainer) {
          (swal2HtmlContainer as HTMLElement).style.padding = '0';
        }
        if (swal2Validation) {
          (swal2Validation as HTMLElement).style.marginTop = '30px';
        }
        if (modalWrapper) {
          (modalWrapper as HTMLElement).style.width = '380px';
          (modalWrapper as HTMLElement).style.paddingRight = '60px';
          (modalWrapper as HTMLElement).style.paddingLeft = '60px';
          (modalWrapper as HTMLElement).style.paddingTop = '36px';
          (modalWrapper as HTMLElement).style.paddingBottom = '36px';
        }
      },
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
};

export default customSweetAlert;
