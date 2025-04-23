'use client';

import ToolbarDeleteIcon from '@/components/icons/editor/toolbar-delete';
import ToolbarDuplicate from '@/components/icons/editor/toolbar-duplicate';
import ToolBarBottom from '@/components/icons/editor/toolbar-move-bottom';
import ToolbarMoveDown from '@/components/icons/editor/toolbar-move-down';
import ToolBarTop from '@/components/icons/editor/toolbar-move-top';
import ToolbarMoveUp from '@/components/icons/editor/toolbar-move-up';
import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { Html } from 'react-konva-utils';
import { v4 as uuidv4 } from 'uuid';

interface ElementToolbarProps {
  shapeRefs: React.MutableRefObject<Record<string, Konva.Node>>;
}

const ElementToolbar = ({ shapeRefs }: ElementToolbarProps) => {
  const canvasElements = useEditorStore((state) =>
    state.isCanvasFront ? state.canvasElements : state.canvasBackElements
  );
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

  const handleMove = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (!selectedElementId) return;
    const node = shapeRefs.current[selectedElementId];
    if (!node) return;
    switch (direction) {
      case 'up':
        node.moveUp();
        break;
      case 'down':
        node.moveDown();
        break;
      case 'top':
        node.moveToTop();
        break;
      case 'bottom':
        node.moveToBottom();
        break;
      default:
        break;
    }
  };

  return (
    <Html
      divProps={{
        style: {
          position: 'absolute',
          top: `${toolbar.y}px`,
          left: `${toolbar.x - 100}px`,
          zIndex: 10,
        },
      }}
    >
      <div
        className='flex items-center gap-1 rounded-[6px] bg-white px-[6px] py-1'
        style={{ boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)' }}
      >
        <button onClick={handleDelete} className=''>
          <ToolbarDeleteIcon className='h-4 w-4 bg-white' />
        </button>
        <div className='h-[18px] w-[0.5px] bg-gray-10' />
        <button onClick={handleDuplicate}>
          <ToolbarDuplicate className='h-4 w-4 bg-white' />
        </button>
        <div className='h-[18px] w-[0.5px] bg-gray-10' />
        <button onClick={() => handleMove('up')}>
          <ToolbarMoveUp />
        </button>
        <div className='h-[18px] w-[0.5px] bg-gray-10' />
        <button onClick={() => handleMove('down')}>
          <ToolbarMoveDown />
        </button>
        <div className='h-[18px] w-[0.5px] bg-gray-10' />
        <button onClick={() => handleMove('top')}>
          <ToolBarTop />
        </button>
        <div className='h-[18px] w-[0.5px] bg-gray-10' />
        <button onClick={() => handleMove('bottom')}>
          <ToolBarBottom />
        </button>
      </div>
    </Html>
  );
};

export default ElementToolbar;
