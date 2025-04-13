import { sideBarStore } from '@/store/editor.sidebar.store';
import { useState } from 'react';
import EditorSidebarElement from './editor-sidebar-element';
import { CATEGORY, CATEGORYLIST } from '@/constants/editor.constant';
import { useEditorStore } from '@/store/editor.store';

const EditorSideBar = () => {
  const sidebarStatus = sideBarStore((status) => status.sidebarStatus);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);
  const setSelectedType = useEditorStore(
    (state) => state.setSelectedElementType
  );
  const [category, setCategory] = useState('');

  return (
    <aside className='flex flex-row'>
      <div className='flex w-16 flex-col gap-6 border'>
        {CATEGORYLIST.map((item) => {
          return (
            <div
              key={item.name}
              onClick={() => {
                const isSameCategory = category === item.name;
                setCategory(item.name);
                if (isSameCategory) {
                  setSidebarStatus(!sidebarStatus);
                }
                if (!isSameCategory) {
                  setSidebarStatus(true);
                }
                setSelectedType(null);
              }}
            >
              <div>{item.img}</div>
              <p>{item.name}</p>
            </div>
          );
        })}
        <button
          onClick={() => {
            if (!category) {
              setCategory(CATEGORY.TEMPLATE);
            }
            setSidebarStatus(!sidebarStatus);
          }}
        >
          {sidebarStatus ? '<<' : '>>'}
        </button>
      </div>
      {sidebarStatus && <EditorSidebarElement category={category} />}
    </aside>
  );
};

export default EditorSideBar;
