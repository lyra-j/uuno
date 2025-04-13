import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEffect, useState } from 'react';
import EditorSidebarElement from './editor-sidebar-element';
import {
  CATEGORY,
  CATEGORYLIST,
  ElEMENT_TYPE,
} from '@/constants/editor.constant';
import { useEditorStore } from '@/store/editor.store';

const EditorSideBar = () => {
  const sidebarStatus = sideBarStore((status) => status.sidebarStatus);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);
  const [localCategory, setLocalCategory] = useState('');
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const canvasElements = useEditorStore((state) => state.canvasElements);

  // 선택된 요소가 있으면 그 요소의 type을 effectiveCategory로 사용하고, 없으면 localCategory 사용
  const effectiveCategory = selectedElementId
    ? canvasElements.find((el) => el.id === selectedElementId)?.type || ''
    : localCategory;

  useEffect(() => {
    if (selectedElementId) {
      setSidebarStatus(true);
    }
  }, [selectedElementId, setSidebarStatus]);

  return (
    <aside className='flex flex-row'>
      <div className='flex w-16 flex-col gap-6 border'>
        {CATEGORYLIST.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setLocalCategory(item.type);
              setSidebarStatus(true);
            }}
            className='cursor-pointer'
          >
            <div>{item.img}</div>
            <p>{item.name}</p>
          </div>
        ))}
        <button
          onClick={() => {
            if (!localCategory) {
              setLocalCategory(ElEMENT_TYPE.TEMPLATE);
            }
            setSidebarStatus(!sidebarStatus);
          }}
        >
          {sidebarStatus ? '<<' : '>>'}
        </button>
      </div>
      {sidebarStatus && (
        <EditorSidebarElement category={effectiveCategory || localCategory} />
      )}
    </aside>
  );
};

export default EditorSideBar;
