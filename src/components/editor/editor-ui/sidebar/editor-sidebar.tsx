import { sideBarStore } from '@/store/editor.sidebar.store';
import { useState } from 'react';
import EditorSidebarElement from './editor-sidebar-element';

const tempCategory = [
  { img: '', name: '템플릿' },
  { img: '', name: '사진' },
  { img: '', name: '업로드' },
  { img: '', name: '요소' },
  { img: '', name: '텍스트' },
  { img: '', name: '배경' },
  { img: '', name: 'QR/소셜' },
];

const EditorSideBar = () => {
  const sidebarStatus = sideBarStore((status) => status.sidebarStatus);
  const setSidebarStatus = sideBarStore((status) => status.setSideBarStatus);
  const [category, setCategory] = useState('');

  return (
    <aside className='flex flex-row'>
      <div className='flex w-16 flex-col gap-6 border'>
        {tempCategory.map((item) => {
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
                console.log(sidebarStatus);
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
              setCategory('템플릿');
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
