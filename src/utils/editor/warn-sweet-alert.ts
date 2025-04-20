'use client';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import Swal from 'sweetalert2';

export const handleSwitchCard = () => {
  const { canvasElements, canvasBackElements, isCanvasFront, reset } =
    useEditorStore.getState();

  const { isHorizontal, setIsHorizontal, setZoom, isTemplate } =
    sideBarStore.getState();

  const currentCanvasElements = isCanvasFront
    ? canvasElements
    : canvasBackElements;
  if (isTemplate) {
    Swal.fire('템플릿은 해당 작업을 할 수 없습니다!');
    return;
  }
  if (currentCanvasElements.length > 0) {
    Swal.fire({
      title: '변경하시겠습니까?',
      text: '변경하면 현재 작업하신 내용은 삭제가 됩니다. 진행하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '변경하겠습니다!',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '변경되었습니다!',
          text: '',
          icon: 'success',
        });
        reset();
        setIsHorizontal(!isHorizontal);
        void (isHorizontal ? setZoom(1.4) : setZoom(2));
      }
    });
  } else {
    setIsHorizontal(!isHorizontal);
    void (isHorizontal ? setZoom(1.4) : setZoom(2));
  }
};
