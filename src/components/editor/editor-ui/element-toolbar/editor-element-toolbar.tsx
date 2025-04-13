'use client';

import { useEditorStore } from '@/store/editor.store';
import { Html } from 'react-konva-utils';
import { v4 as uuidv4 } from 'uuid';

const ElementToolbar = () => {
  const canvasElements = useEditorStore((s) => s.canvasElements);
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const toolbar = useEditorStore((s) => s.toolbar);
  const removeElement = useEditorStore((s) => s.removeElement);
  const setSelectedElementId = useEditorStore((s) => s.setSelectedElementId);
  const setSelectedElementType = useEditorStore(
    (s) => s.setSelectedElementType
  );
  const setToolbar = useEditorStore((s) => s.setToolbar);
  const addElement = useEditorStore((s) => s.addElement);

  if (!selectedElementId || !toolbar) return null;

  const handleDelete = () => {
    removeElement(selectedElementId);
    setSelectedElementId(null);
    setSelectedElementType(null);
    setToolbar(null);
  };

  const handleDuplicate = () => {
    const original = canvasElements.find((el) => el.id === selectedElementId);
    if (!original) return;

    const clone = {
      ...original,
      id: uuidv4(),
      x: original.x + 10,
      y: original.y + 10,
    };

    addElement(clone);
    setSelectedElementId(clone.id);
    setSelectedElementType(clone.type);
  };

  return (
    <Html
      divProps={{
        style: {
          position: 'absolute',
          top: `${toolbar.y}px`,
          left: `${toolbar.x}px`,
          zIndex: 10,
        },
      }}
    >
      <div className='flex gap-2 rounded bg-white p-1 shadow'>
        <button onClick={handleDelete}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M5.75 3H10.25V4.36364H13V5.27273H11.9855L11.7355 13H4.2645L4.0145 5.27273H3V4.36364H5.75V3ZM6.75 4.36364H9.25V3.90909H6.75V4.36364ZM5.015 5.27273L5.2355 12.0909H10.7645L10.985 5.27273H5.015ZM7 6.18182L7.5 11.1818H6.75L6.25 6.18182H7Z'
              fill='#37383C'
            />
            <path
              d='M9 6.18182H9.75L9.25 11.1818H8.5L9 6.18182Z'
              fill='#37383C'
            />
          </svg>
        </button>
        <button onClick={handleDuplicate}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M6.63636 7.09091V9.36364M6.63636 9.36364V11.6364M6.63636 9.36364H4.36364M6.63636 9.36364H8.90909M5.72727 4.36364V3H13V10.2727H11.6364M3 13V5.72727H10.2727V13H3Z'
              stroke='#37383C'
            />
          </svg>
        </button>
      </div>
    </Html>
  );
};

export default ElementToolbar;
