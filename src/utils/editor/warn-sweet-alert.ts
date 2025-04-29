'use client';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import Swal from 'sweetalert2';
import { isCardContent } from './editor-card-type-guard';
import sweetAlertUtil from '../common/sweet-alert-util';

export const handleSwitchCard = (horizontal: boolean) => {
  const { canvasElements, canvasBackElements, reset, template } =
    useEditorStore.getState();

  const { isHorizontal, setIsHorizontal, setZoom } = sideBarStore.getState();

  const isContent = canvasElements.length > 0 || canvasBackElements.length > 0;

  if (isHorizontal === horizontal) return;

  const flipSetting = () => {
    setIsHorizontal(!isHorizontal);
    void (isHorizontal ? setZoom(1.4) : setZoom(2));
  };

  if (isCardContent(template?.content) && template.content.isTemplate) {
    sweetAlertUtil.info('템플릿은 해당 작업을 할 수 없습니다.');
    return;
  }

  if (isContent) {
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
        sweetAlertUtil.success('변경되었습니다!');
        reset();
        flipSetting();
      }
    });
  } else {
    flipSetting();
  }
};
