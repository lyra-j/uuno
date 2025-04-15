import { sideBarStore } from '@/store/editor.sidebar.store';
import { useState } from 'react';
import EditorSidebarElement from './editor-sidebar-element';
import { CATEGORY, CATEGORYLIST } from '@/constants/editor.constant';
import { useEditorStore } from '@/store/editor.store';
import SidebarToggleRightBtn from '@/components/icons/editor/sidebar-toggle-right';
import SidebarToggleLeftBtn from '@/components/icons/editor/sidebar-toggle-left';

const EditorSideBar = () => {
  const sidebarStatus = sideBarStore((status) => status.sidebarStatus);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);
  const [category, setCategory] = useState('');
  const setSelectedType = useEditorStore(
    (state) => state.setSelectedElementType
  );

  return (
    <aside className='flex flex-row'>
      <div className='flex w-16 flex-col justify-between border p-1'>
        <div className='flex w-[56px] flex-col items-start'>
          {CATEGORYLIST.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className='flex flex-col items-center gap-[2px] self-stretch px-[6px] py-3'
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
                <div className='flex cursor-pointer flex-col items-center'>
                  {Icon && <Icon />}
                  <p className='font-sans text-caption-medium'>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className='flex w-[56px] items-center justify-center p-4'
          onClick={() => {
            if (!category) {
              setCategory(CATEGORY.TEMPLATE);
            }
            setSidebarStatus(!sidebarStatus);
          }}
        >
          {sidebarStatus ? <SidebarToggleLeftBtn /> : <SidebarToggleRightBtn />}
        </button>
      </div>
      {sidebarStatus && <EditorSidebarElement category={category} />}
    </aside>
  );
};

export default EditorSideBar;
